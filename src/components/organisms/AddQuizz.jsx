import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, NavLink } from "react-router-dom"
import axios from 'axios'
import { teacherState } from "../../store/Provider"
import { useRecoilValue } from 'recoil'

// Composant de création d'un quizz de type QCM avec possibilité de créer plusieurs QCM par quizz.
const AddQuizz = () => {

    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('');
    const [quizz, setQuizz] = useState([{ question: "", answer: "", choices: new Array(4).fill("") },]);
    const navigate = useNavigate();
    const cycle = ["Hors Cycle", "Cycle 1 : PS, MS, GS", "Cycle 2 : CP, CE1, CE2", "Cycle 3 : CM1, CM2, 6ème", "Cycle 4 : 5ème, 4ème, 3ème", "Cycle 5 : Seconde, Première, Terminale", "Cycle 6 ou Supérieur"];
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
                    <input type="text" name="title" id="title" {...register('title', { required: "Vous devez entrer un titre pour le quizz" })} />

                    <label htmlFor="author">Auteur</label>
                    <input type="text" name="author" id="author" {...register('author', { required: true })} />

                    <label htmlFor="discipline">Discipline</label>
                    <input type="text" name="discipline" id="discipline" {...register('discipline', { required: true })} />

                    <label htmlFor="cycle">Cycle</label>
                    <select name="cycle"
                        {...register('cycle', { required: true })}>
                        {cycle.map((c, i) => (
                            <option key={i}>{c}</option>
                        ))}
                    </select>

                    <label htmlFor="description">Description succincte</label>
                    <textarea name="description" id="description" {...register('description', { required: true })}></textarea>

                    {quizz?.map((question, index) => (
                        <div key={index} className="choices-form">
                            <label htmlFor={`question-${index + 1}`}>Question {index + 1} : </label>
                            <input
                                type="text"
                                id={`question-${index}`}
                                {...register(`quizz[${index}].question`, { required: true })} />
                            <section>
                                {question.choices.map((choice, i) => (
                                    <div key={i}>
                                        <label htmlFor={`choice-${i}`}>Choix {i + 1} : </label>
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
                    <button type="button" onClick={handleAddQuestion} aria-label="Ajouter une nouvelle question">Ajouter une question</button>
                    <button type="submit" aria-label="Valider la création du quizz">Valider le quizz</button>
                </form>
            ) : (
                <p>Vous ne disposez pas des droits nécessaires pour créer un quizz. Vous devez être un professeur et être connecté <NavLink to="/login" aria-label="Redirection vers la page de connexion">ici</NavLink>.</p>
            )}
        </>
    );
}

export default AddQuizz