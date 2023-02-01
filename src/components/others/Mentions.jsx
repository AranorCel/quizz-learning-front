import React from 'react'
import { NavLink } from "react-router-dom"

const Mentions = () => {
    return (
        <>
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
                <p>Pour nous contacter : <NavLink to="/contactUs">Cliquez ici !</NavLink></p>
            </section>
            <section>
                <h2>Hébergeur</h2>
                <p>Nom & Prénom : XXX XXX</p>
                <p>Adresse : XX Rue XXXX - 44000 NANTES </p>
            </section>
            <section>
                <h2>Charte</h2>
                <p>Pour plus d'informations sur la Charte du site : <NavLink to="/charte">Cliquez ici !</NavLink></p>
            </section>
            <section>
                <h2>Politique de confidentialité</h2>
                <p>Pour plus d'informations sur la politique de confidentialité : <NavLink to="/privacyPolicy">Cliquez ici !</NavLink></p>
            </section>
            <section>
                <h2>Gestion des cookies</h2>
                <p>Pour plus d'informations sur la politique de gestion des cookies : <NavLink to="/cookieManagement">Cliquez ici !</NavLink></p>
            </section>
        </>
    )
}

export default Mentions