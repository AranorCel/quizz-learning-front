import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { teacherState } from "../../store/Provider"
import { useRecoilValue } from 'recoil'

// Composant de création d'un quizz de type QCM avec possibilité de créer plusieurs QCM par quizz.
const AddQuizz = () => {

    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('');
    const [quizz, setQuizz] = useState([{ question: "", answer: "", choices: new Array(4).fill("") },]);
    const navigate = useNavigate();
    const isTeacher = useRecoilValue(teacherState)

    // Fonctionnalité permettant de créer des questions supplémentaires au quizz 
    const handleAddQuestion = () => {
        setQuizz([...quizz, { question: "", answer: "", choices: new Array(4).fill("") }]);
    };

    // Avec register, il est possible de définir le format en sortie souhaité. Ici, le schéma retenu est composé des keys "question" et "choices". La key question est en lien avec une value au format String et la key choices est un tableau comprenant à la fois l'option (label) au format String et la réponse (check) au format boolean ce qui permet de gérer les réponses multiples.
    const onSubmit = async data => {
        
        try {
            const response = await axios
                .post("http://localhost:8000/api/quizz", {
                    title: data.title,
                    author: data.author,
                    discipline: data.discipline,
                    cycle: data.cycle,
                    description: data.description,
                    image: data.image,
                    date: Date.now(),
                    tests: data.quizz
                });
        } catch (err) {
            setError(err?.message);
        }
        /* navigate("/quizz") */
    }

    // Affichage et accès limité aux professeurs via l'outil recoil et l'état global associé
    return (
        <>
            {isTeacher ? (
                <form onSubmit={handleSubmit(onSubmit)} method='POST' className='quizz-form'>

                    <label htmlFor="title">Titre du quizz</label>
                    <input type="text" name="title" id="title" {...register('title', { required: "Vous devez entrer titre pour le quizz" })} />

                    <label htmlFor="author">Auteur</label>
                    <input type="text" name="author" id="author" {...register('author', { required: true })} />

                    <label htmlFor="discipline">Discipline</label>
                    <input type="text" name="discipline" id="discipline" {...register('discipline', { required: true })} />

                    <label htmlFor="cycle">Cycle</label>
                    <input type="text" name="cycle" id="cycle" {...register('cycle', { required: true })} />

                    <label htmlFor="description">Description succincte</label>
                    <textarea name="description" id="description" {...register('description', { required: true })}></textarea>

                    {quizz?.map((question, index) => (
                        <div key={index} className="choices-form">
                            <label htmlFor={`question-${index}`}>Question {index+1} : </label>
                            <input
                                type="text"
                                id={`question-${index}`}
                                {...register(`quizz[${index}].question`, { required: true })}/>
                            <section>
                                {question.choices.map((choice, i) => (
                                    <div key={i}>
                                        <label htmlFor={`choice-${i}`}>Choix {i+1} : </label>
                                        <input
                                            type="text"
                                            id={`choiceLabel-${i}`}
                                            {...register(`quizz[${index}].choices[${i}].label`, { required: true })}
                                        />
                                        <label htmlFor={`choice-${i}`}>Cochez si la réponse est vraie : </label>
                                        <input 
                                            type="checkbox" 
                                            id={`choiceCheck-${i}`} 
                                            {...register(`quizz[${index}].choices[${i}].check`)}
                                            />
                                    </div>
                                ))}
                            </section>
                            
                        </div>
                    ))}
                    <button type="button" onClick={handleAddQuestion}>Ajouter une question</button>
                    <button type="submit">Envoyer</button>
                </form>
            ) : ("Vous ne disposez pas des droits nécessaires")}
        </>
    );
}

export default AddQuizz