import React from 'react'
import { NavLink } from "react-router-dom"

const CardQuizz = ({ quizz }) => {

    //? Nombre minimal de caractères à afficher dans la description
    const min = 0;
    //? Nombre maximal de caractères à afficher dans la description
    const max = 75;

    return (
        <>
            <li className='card'>
                <h2>{quizz.title}</h2>
                <p>Discipline : {quizz.discipline}</p>
                <p>Cycle : {quizz.cycle}</p>
                <p>Description : {quizz.description && (quizz.description.substring(min, max)).concat(quizz.description.length > max ? "..." : "")}</p>
                <p>Date : {quizz.date}</p>
                <p>Auteur : {quizz.author}</p>
                <div className='details'>
                    <NavLink to={`/quizz/${quizz._id}`} aria-label="Redirection vers le quizz ciblé">
                        <button>Voir ce quizz</button>
                    </NavLink>
                </div>
            </li>
        </>
    )
}

export default CardQuizz