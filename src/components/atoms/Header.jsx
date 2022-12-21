import React from 'react'
import { NavLink } from "react-router-dom"

const Header = () => {

    const handleClick = () => {

    }

    return (
        <>
            <nav className='nav'>
                <NavLink to="/">ACCUEIL</NavLink>
                <NavLink to="/lessons">LEÇONS</NavLink>
                <NavLink to="/quizz">QUIZZ</NavLink>
                <NavLink to="/about">NOTRE HISTOIRE</NavLink>
                <NavLink to="/login">Se connecter</NavLink>
                <NavLink to="/" onClick={handleClick}>Se déconnecter</NavLink>
            </nav>
        </>
    )
}

export default Header