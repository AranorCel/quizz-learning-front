import React from 'react'
import { NavLink } from "react-router-dom"

const Header = () => {

    const handleClick = () => {

    }

    return (
        <>
        <h1>Bienvenue sur Quizz Learning</h1>
        <p>L'endroit idéal pour découvrir, apprendre et consolider ses connaissances de façon ludique et intéractive.</p>
            <nav className='header-nav surf' activeclassname="active">
                <NavLink to="/">ACCUEIL</NavLink>
                <NavLink to="/lessons">LEÇONS</NavLink>
                <NavLink to="/quizz">QUIZZ</NavLink>
                <NavLink to="/about">NOTRE HISTOIRE</NavLink>
                <NavLink to="/login">Se connecter</NavLink>
                <NavLink to="/signup">S'enregistrer</NavLink>
                <NavLink to="/logout" onClick={handleClick}>Se déconnecter</NavLink>
            </nav>
        </>
    )
}

export default Header