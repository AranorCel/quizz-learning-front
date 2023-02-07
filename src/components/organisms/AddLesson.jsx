import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, NavLink } from "react-router-dom"
import axios from 'axios'
import { teacherState } from "../../store/Provider"
import { useRecoilValue } from 'recoil'

// Composant de création d'une leçon de type question / réponse avec possibilité d'ajouter plusieurs notions pour chaque leçon. Démarche itérative de transformation des tableaux et objets sans utiliser les fonctionnalités de register de hook-form (utilisation optimisée dans le composant AddQuizz).
const AddLesson = () => {

    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('');
    const [lessons, setLessons] = useState([{ question: "", answer: "" },]);
    const cycle = ["Hors Cycle", "Cycle 1 : PS, MS, GS", "Cycle 2 : CP, CE1, CE2", "Cycle 3 : CM1, CM2, 6ème", "Cycle 4 : 5ème, 4ème, 3ème", "Cycle 5 : Seconde, Première, Terminale", "Cycle 6 ou Supérieur"];
    const navigate = useNavigate();
    const isTeacher = useRecoilValue(teacherState)

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
                    <input type="text" name="title" {...register('title', { required: "Vous devez entrer titre pour la leçon" })} />

                    <label htmlFor="author">Auteur</label>
                    <input type="text" name="author" {...register('author', { required: true })} />

                    <label htmlFor="discipline">Discipline</label>
                    <input type="text" name="discipline" {...register('discipline', { required: true })} />

                    <label htmlFor="cycle">Cycle</label>
                    <select name="cycle"
                        {...register('cycle', { required: true })}>
                        {cycle.map((c, i) => (
                            <option key={i}>{c}</option>
                        ))}
                    </select>

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
                    <button type="button" onClick={handleAddQuestion} aria-label="Ajouter une nouvelle notion">Ajouter une notion</button>
                    <button type="submit" aria-label="Valider la création de la leçon">Valider la leçon</button>
                </form>
            ) : (
                <p>Vous ne disposez pas des droits nécessaires pour créer une leçon. Vous devez être un professeur et être connecté <NavLink to="/login" aria-label="Redirection vers la page de connexion">ici</NavLink>.</p>
            )}
        </>
    );
}

export default AddLesson