import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'

const AddLesson = () => {

    const { register, handleSubmit, reset } = useForm()
    const [status, setStatus] = useState("");

    const onSubmit = async data => {
        /* console.log(data) */
        await axios
            .post("http://localhost:8000/api/lesson", {
                title: data.title,
                author: data.author,
                discipline: data.discipline,
                cycle: data.cycle,
                description: data.description,
                image: data.image,
                date: Date.now()
            })
            .then((res) => {
                console.log(res);
            },
                (erreur) => {
                    console.log(erreur);
                }
            );
        reset()
        setStatus("Leçon créée");
    }

    return (
        <>
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

                <button onSubmit={handleSubmit(onSubmit)}>Créer la leçon</button>
            </form>
            <p>{status}</p>
        </>
    )
}

export default AddLesson