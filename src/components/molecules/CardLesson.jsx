import React from 'react'
import { NavLink } from "react-router-dom"

const CardLesson = ({ lesson }) => {

    //? Nombre minimal de caractères à afficher dans la description
    const min = 0;
    //? Nombre maximal de caractères à afficher dans la description
    const max = 75;

    return (
        <>
            <li className='card'>
                <h2>{lesson.title}</h2>
                <p>Discipline : {lesson.discipline}</p>
                <p>Cycle : {lesson.cycle}</p>
                <p>Description : {lesson.description && (lesson.description.substring(min, max)).concat(lesson.description.length > max ? "..." : "")}</p>
                <p>Date : {lesson.date}</p>
                <p>Auteur : {lesson.author}</p>
                <div className='details'>
                    <button>
                        <NavLink to={`/lesson/${lesson._id}`} aria-label="Redirection vers la leçon ciblée">Voir cette leçon</NavLink>
                    </button>
                </div>
            </li>
        </>
    )
}

export default CardLesson