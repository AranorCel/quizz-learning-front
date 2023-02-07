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
                <NavLink to="/" aria-label="Redirection vers la page d'accueil">ACCUEIL</NavLink>
                <NavLink to="/lessons" aria-label="Redirection vers la page des leçons">LEÇONS</NavLink>
                <NavLink to="/quizz" aria-label="Redirection vers la page des quizz">QUIZZ</NavLink>
                <NavLink to="/about" aria-label="Redirection vers la page à propos de notre histoire">NOTRE HISTOIRE</NavLink>
                {!isAuth ? (
                    <>
                        <NavLink to="/login" aria-label="Redirection vers la page de connexion">Se connecter</NavLink>
                        <NavLink to="/signup" aria-label="Redirection vers la page de création de compte">S'enregistrer</NavLink>
                    </>
                ) : (
                    <NavLink to="/logout" aria-label="Redirection vers la page de déconnexion">Se déconnecter</NavLink>
                )}
            </nav>
        </>
    )
}

export default Header