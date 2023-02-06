import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <p>Ressources complémentaires</p>
            <nav className='footer-nav'>
                <NavLink to="/mentions">Mentions légales</NavLink>
                <NavLink to="/charte">Charte du site</NavLink>
                <NavLink to="/privacyPolicy">Politique de confidentialité</NavLink>
                <NavLink to="/cookieManagement">Gestion des cookies</NavLink>
                <NavLink to="/aide">Aide (FAQ)</NavLink>
            </nav>
        </>
    )
}

export default Footer