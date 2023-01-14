import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <p>Ressources complémentaires</p>
            <nav className='footer-nav'>
                <NavLink to="/">Mentions légales</NavLink>
                <NavLink to="/">Charte du site</NavLink>
                <NavLink to="/">Politique de confidentialité</NavLink>
                <NavLink to="/">Gestion des cookies</NavLink>
                <NavLink to="/">Aide (FAQ)</NavLink>
            </nav>
        </>
    )
}

export default Footer