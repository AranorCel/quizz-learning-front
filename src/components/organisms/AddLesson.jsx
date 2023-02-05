import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { teacherState } from "../../store/Provider"
import { useRecoilValue } from 'recoil'

const AddLesson = () => {

    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('');
    const [lessons, setLessons] = useState([{ question: "", answer: "" },]);
    const navigate = useNavigate();
    const isTeacher = useRecoilValue(teacherState)

    console.log(isTeacher)

    // Fonctionnalité permettant de créer des notions supplémentaires à la leçon
    const handleAddQuestion = () => {
        setLessons([...lessons, { question: "", answer: "" }]);
    };

    const onSubmit = async data => {
        // Transformer un objet en tableau avec les clés ET les valeurs
        const items = Object.entries(data.response).map(field => {
            // Séparer le numéro d'index du type (question/réponse)
            let [type, index, value] = [field[0].split("-"), field[1]].flat()
            return { type: type, index: index, value: value }
        });

        // Initialiser un tableau en fonction du nombre de paire clé/valeur. Ici 2 (1 question, 1 réponse)
        const keyNumberLesson = 2;
        let itemsArray = Array(items.length / keyNumberLesson).fill([])

        // Fusionner les questions et les réponses dans un nouveau tableau avec leurs valeurs à partir d'un index unique
        for (let i = 0; i < items.length; i++) {
            const index = parseInt(items[i].index);
            itemsArray[index] = [...itemsArray[index], [items[i].type, items[i].value]];
        };

        // Retransformer les tableaux dans un nouvel objet question / réponse
        itemsArray = itemsArray.map((item) => Object.fromEntries(item))

        try {
            const response = await axios
                .post("http://localhost:8000/api/lesson", {
                    title: data.title,
                    author: data.author,
                    discipline: data.discipline,
                    cycle: data.cycle,
                    description: data.description,
                    image: data.image,
                    date: Date.now(),
                    knowledges: itemsArray
                });
        } catch (err) {
            setError(err?.message);
        }
        navigate("/lessons")
    }

    // Affichage et accès limité aux professeurs via l'outil recoil et l'état global associé
    return (
        <>
            {isTeacher ? (
                <form onSubmit={handleSubmit(onSubmit)} method='POST' className='lesson-form'>

                    <label htmlFor="title">Titre de la leçon</label>
                    <input type="text" name="title" id="title" {...register('title', { required: "Vous devez entrer titre pour la leçon" })} />

                    <label htmlFor="author">Auteur</label>
                    <input type="text" name="author" id="author" {...register('author', { required: true })} />

                    <label htmlFor="discipline">Discipline</label>
                    <input type="text" name="discipline" id="discipline" {...register('discipline', { required: true })} />

                    <label htmlFor="cycle">Cycle</label>
                    <input type="text" name="cycle" id="cycle" {...register('cycle', { required: true })} />

                    <label htmlFor="description">Description succincte</label>
                    <textarea name="description" id="description" {...register('description', { required: true })}></textarea>

                    {lessons.map((question, index) => (
                        <div key={index}>
                            <label htmlFor={`question-${index}`}>Question {index} : </label>
                            <input
                                type="text"
                                id={`question-${index}`}
                                {...register(`response.question-${index.toString().padStart(2, '0')}`)}
                            />
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

export default AddLesson