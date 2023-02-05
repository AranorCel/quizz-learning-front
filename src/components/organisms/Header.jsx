import React from 'react'
import { NavLink } from "react-router-dom"
import { authState } from "../../store/Provider"
import { useRecoilValue } from 'recoil'

const Header = () => {

    // Utilisation de la valeur de l'état global d'authentification de la connexion afin de jouer sur l'affichage principalement des options de "Se connecter" et "S'enregistrer" qui n'apparaissent pas lorsque l'on est connecté et vice versa avec "Se déconnecter"
    const isAuth = useRecoilValue(authState)

    return (
        <>
            <h1>Bienvenue sur Quizz Learning</h1>
            <p>L'endroit idéal pour découvrir, apprendre et consolider ses connaissances de façon ludique et intéractive.</p>
            <nav className='header-nav surf' activeclassname="active">
                <NavLink to="/">ACCUEIL</NavLink>
                <NavLink to="/lessons">LEÇONS</NavLink>
                <NavLink to="/quizz">QUIZZ</NavLink>
                <NavLink to="/about">NOTRE HISTOIRE</NavLink>
                {!isAuth ? (
                    <>
                        <NavLink to="/login">Se connecter</NavLink>
                        <NavLink to="/signup">S'enregistrer</NavLink>
                    </>
                ) : (
                    <NavLink to="/logout">Se déconnecter</NavLink>
                )}
            </nav>
        </>
    )
}

export default Header