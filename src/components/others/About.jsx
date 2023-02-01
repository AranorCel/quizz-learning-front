import React from 'react'
import { NavLink } from "react-router-dom"

const About = () => {
    return (
        <>
            <section>
                <h1>Notre histoire</h1>
                <p>
                    L'histoire débute avec une idée simple : offrir aux enseignants et formateurs un outil simple pour partager leurs cours avec la possibilité de créer des quizz ludiques pour vérifier les apprentissages. Les enseignants cherchent des moyens efficaces pour créer et partager des matériels pédagogiques, mais ils se heurtent souvent à des difficultés techniques, des contraintes réglementaires (RGPD) ou à des outils peu adaptés à leurs besoins.
                </p>
                <p>
                    C'est de ce postulat qu'est né ce projet, un site internet pour les enseignants qui souhaitent mettre à disposition des cours et des quizz. Il s'agit d'une plateforme ergonomique et intuitive qui permet de créer en quelques minutes les supports afin de les partager en quelques clics.
                </p>
                <p>
                    La plateforme offre également des fonctionnalités avancées telles que la possibilité de créer des cours interactifs et des quizz à choix multiples ainsi que des outils de suivi des résultats pour les enseignants (fonctionnalité en cours de déploiement). Elle a été conçue pour répondre aux besoins des enseignants et des élèves et elle contribuera à améliorer l'expérience d'apprentissage pour tous.
                </p>
                <p>
                    Ce projet est maintenant devenu un produit mature et je suis ravi de voir que de plus en plus d'enseignants l'utilisent chaque jour pour améliorer l'apprentissage de leurs élèves. Le travail se poursuit et l'équipe va se renforcer afin de continuer à améliorer la plateforme pour répondre aux besoins en constante évolution des enseignants et des élèves.
                </p>
                <p>
                    L'équipe est à votre écoute pour tout commentaire, difficulté d'usage (création ou lecture) ainsi que toute suggestion permettant d'améliorer votre expérience. Pour nous contacter : <NavLink to="/contactUs">Cliquez ici !</NavLink>
                </p>
            </section>
        </>
    )
}

export default About