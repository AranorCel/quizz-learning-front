import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LessonById = () => {
    const { id } = useParams();
    const [lesson, setLesson] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/lesson/${id}`)
            .then(res => setLesson(res.data.lesson))
    }, [id]);

    const deleteLesson = async () => {
        await axios
            .delete(`http://localhost:8000/api/lesson/${id}`)
            .then(() => setLesson("leçon supprimée"))
    }

    return (
        <>
            <h2>{lesson.title}</h2>
            <div className='card-flip'>
                <section className='card-front'>
                    <p>{lesson.description}</p>
                </section>
                <section className='card-back'>
                    <p>{lesson.author}</p>
                </section>
            </div>
            <div>
                <button>Éditer</button>
            </div>
            <div>
                <button onClick={() => deleteLesson()}>Supprimer</button>
            </div>
        </>
    )
}

export default LessonById