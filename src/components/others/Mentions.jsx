import React from 'react'
import { NavLink } from "react-router-dom"

const Mentions = () => {
    return (
        <div className='support'>
            <h1>Mentions légales</h1>
            <section>
                <h2>Informations légales</h2>
                <p>QuizzLearning.fr</p>
                <p>Numéro TVA : FR XX XXX XXX XXX</p>
                <h2>Éditeur</h2>
                <p>Société anonyme XXX</p>
                <p>Au capital : XXX €</p>
                <p>Immatriculée au RCS de Paris sous le n°XXX XXX XXX</p>
                <p>Dont le siège social est situé XX Rue Victor Hugo - 44000 NANTES</p>
            </section>
            <section>
                <h2>Directeur de la publication</h2>
                <p>Nom & Prénom : QUERIAQUAUD Arnaud</p>
                <p>Téléphone : 0X XX XX XX XX</p>
                <p>Pour nous contacter : <NavLink to="/contactUs" aria-label="Redirection vers la page pour nous envoyer vos commentaires et pistes d'amélioration">Cliquez ici !</NavLink></p>
            </section>
            <section>
                <h2>Hébergeur</h2>
                <p>Nom & Prénom : XXX XXX</p>
                <p>Adresse : XX Rue XXXX - 44000 NANTES </p>
            </section>
            <section>
                <h2>Charte</h2>
                <p>Pour plus d'informations sur la Charte du site : <NavLink to="/charte" aria-label="Redirection vers la page de la Charte du site">Cliquez ici !</NavLink></p>
            </section>
            <section>
                <h2>Politique de confidentialité</h2>
                <p>Pour plus d'informations sur la politique de confidentialité : <NavLink to="/privacyPolicy" aria-label="Redirection vers la page de politique de confidentialité">Cliquez ici !</NavLink></p>
            </section>
            <section>
                <h2>Gestion des cookies</h2>
                <p>Pour plus d'informations sur la politique de gestion des cookies : <NavLink to="/cookieManagement" aria-label="Redirection vers la page d'informations sur la gestion des cookies">Cliquez ici !</NavLink></p>
            </section>
        </div>
    )
}

export default Mentions