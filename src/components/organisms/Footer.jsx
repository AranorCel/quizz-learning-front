import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <p>Ressources complémentaires</p>
            <nav className='footer-nav surf' activeclassname="active">
                <NavLink to="/mentions" aria-label="Redirection vers la page des mentions légales">Mentions légales</NavLink>
                <NavLink to="/charte" aria-label="Redirection vers la page de la Charte du site">Charte du site</NavLink>
                <NavLink to="/privacyPolicy" aria-label="Redirection vers la page de politique de confidentialité">Politique de confidentialité</NavLink>
                <NavLink to="/cookieManagement" aria-label="Redirection vers la page d'informations sur la gestion des cookies">Gestion des cookies</NavLink>
                <NavLink to="/aide" aria-label="Redirection vers la page d'aide et des questions fréquemment posées">Aide (FAQ)</NavLink>
            </nav>
        </>
    )
}

export default Footer