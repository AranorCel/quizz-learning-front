import React from 'react'
import { NavLink } from "react-router-dom"

const Card = ({ lesson }) => {

    //? Nombre minimal de caractères à afficher dans la description
    const min = 0;
    //? Nombre maximal de caractères à afficher dans la description
    const max = 75;

    return (
        <>
            <li className='card'>
                <div className='card-front'>
                    <h2>{lesson.title}</h2>
                    <p>Discipline : {lesson.discipline}</p>
                    <p>Cycle : {lesson.cycle}</p>
                    <p>Description : {lesson.description && (lesson.description.substring(min, max)).concat(lesson.description.length > max ? "..." : "")}</p>
                </div>
                <div className='card-back'>
                    <p>Date : {lesson.date}</p>
                    <p>Auteur : {lesson.author}</p>
                </div>
                <div className='details'>
                    <NavLink to={`/lesson/${lesson._id}`}>Voir cette leçon </NavLink>
                </div>
            </li>
        </>
    )
}

export default Card