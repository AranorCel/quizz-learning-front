import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, NavLink, useLocation, useParams } from "react-router-dom"
import axios from 'axios'
import { teacherState } from "../../store/Provider"
import { useRecoilValue } from 'recoil'
import { cycle } from '../../assets/data/Cycle'

// Composant de création d'une leçon de type question / réponse avec possibilité d'ajouter plusieurs notions pour chaque leçon. Démarche itérative de transformation des tableaux et objets sans utiliser les fonctionnalités de register de hook-form (utilisation optimisée dans le composant AddQuizz).
const AddLesson = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const defaultValues = state || {};
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });
    const [error, setError] = useState('');
    const [lessons, setLessons] = useState(state ? state.knowledges : [{ question: "", answer: "" },]);
    const [status, setStatus] = useState("La leçon existe");
    const isTeacher = useRecoilValue(teacherState);

    // Fonctionnalité permettant de créer des notions supplémentaires à la leçon
    const handleAddQuestion = () => {
        setLessons([...lessons, { question: "", answer: "" }]);
    };


    const onSubmit = async data => {
        if (!state) {
            try {
                const response = await axios
                    .post("http://localhost:8000/api/lesson", {
                        ...data,
                        date: new Date().toLocaleDateString("fr"),
                    })
                    .then(() => setStatus("La leçon est créée"));
            } catch (err) {
                setError(err?.message);
            }
        } else {
            try {
                //
                const update = await axios
                    .put(`http://localhost:8000/api/lesson/${state._id}`, {
                        ...data,
                        date: new Date().toLocaleDateString("fr"),
                    })
                    .then(() => setStatus("La leçon est modifiée"));
            } catch (err) {
                setError(err?.message);
            }
        }
        navigate("/lessons")
    }

    // Affichage et accès limité aux professeurs via l'outil recoil et l'état global associé
    return (
        <>
            {isTeacher ? (
                <form onSubmit={handleSubmit(onSubmit)} className='lesson-form'>

                    <label htmlFor="title">Titre de la leçon</label>
                    <input type="text" name="title" {...register('title', { required: "Vous devez entrer un titre pour la leçon" })} />

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
                    <textarea name="description" {...register('description', { required: true })}></textarea>

                    {lessons.map((knowledge, index) => (
                        <div key={index}>
                            <label htmlFor={`question-${index}`}>Question {index} : </label>
                            <input
                                type="text"
                                id={`question-${index}`}
                                {...register(`knowledges[${index}].question`)}
                            />
                            <label htmlFor={`answer-${index}`}>Réponse {index} : </label>
                            <input
                                type="text"
                                id={`answer-${index}`}
                                {...register(`knowledges[${index}].answer`)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddQuestion} aria-label="Ajouter une nouvelle notion">Ajouter une notion</button>

                    {!state ? (
                        <button type="submit" aria-label="Valider la création de la leçon">Valider la leçon</button>
                    ) : (
                        <button type="submit" aria-label="Valider la création de la leçon">Éditer la leçon</button>
                    )}
                </form>
            ) : (
                <section className='presentation'>
                    <h2>Presque...</h2>
                    <p>Vous ne disposez pas des droits nécessaires pour créer une leçon. Vous devez être un professeur et être connecté <NavLink to="/login" aria-label="Redirection vers la page de connexion">ici</NavLink>.</p>
                </section>
            )}
        </>
    );
}

export default AddLesson