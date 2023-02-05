import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { teacherState } from "../../store/Provider"
import { useRecoilValue } from 'recoil'

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

    const onSubmit = async data => {
        // Transformer un objet en tableau avec les clés ET les valeurs
        console.log(data.response);
        const items = Object.entries(data.response).map(field => {
            // Séparer le numéro d'index du type (question/réponse/choix)
            let [type, index, value] = [field[0].split("-"), field[1]].flat()
            return { type: type, index: index, value: value }
        })

        // Initialiser un tableau en fonction du nombre de paire clé/valeur. Ici 6 (1 question, 1 réponse, 4 propositions)
        const keyNumberQuizz = 6;
        let itemsArray = Array(items.length / keyNumberQuizz).fill([])

        // Fusionner les questions, les réponses et les choix dans un nouveau tableau avec leurs valeurs à partir d'un index unique
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            console.log(item)
            const index = parseInt(item.index);
            console.log(index)
            const type = item.type;
            console.log(type)
            const value = item.value;
            console.log(value)
            const arrayIndex = parseInt(index / keyNumberQuizz);
            itemsArray[arrayIndex] = [...itemsArray[arrayIndex], [items[i].type, items[i].value]];
        };

        console.log(itemsArray);

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
                    tests: itemsArray
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
                            <label htmlFor={`question-${index}`}>Question {index} : </label>
                            <input
                                type="text"
                                id={`question-${index}`}
                                {...register(`response.question-${index.toString().padStart(2, '0')}`)}
                            />
                            <div>
                                {question.choices.map((choice, i) => (
                                    <div key={i}>
                                        <label htmlFor={`choice-${i}`}>Choix {i} : </label>
                                        <input
                                            type="text"
                                            id={`choice-${i}`}
                                            {...register(`response.choice-${i.toString().padStart(2, '0')}`)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <label htmlFor={`answer-${index}`}>Réponse {index} : </label>
                            <input
                                type="text"
                                id={`answer-${index}`}
                                {...register(`response.answer-${index.toString().padStart(2, '0')}`)}
                            />
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