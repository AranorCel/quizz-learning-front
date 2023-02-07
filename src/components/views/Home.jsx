import React from 'react';
import axios from "axios"
import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom"
import CardLesson from '../molecules/CardLesson';
import CardQuizz from '../molecules/CardQuizz';

const Home = () => {

    const [lesson, setLesson] = useState([])
    const [quizz, setQuizz] = useState([])

    // Utilisation de useEffect pour l'affichage des leçons et quizz. Le tri n'est effectué qu'au niveau du render. Il aurait également été possible de créer des routes spécifiques uniques avec les filtres permettant de n'envoyer que 3 leçons / quizz. Optimisation ultérieure possible. Optimisation du render avec vérification des changements de "lesson" et de "quizz".
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/lesson")
            .then(res => setLesson(res.data.lesson))
    }, [lesson]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/quizz")
            .then(res => setQuizz(res.data.quizz))
    }, [quizz]);

    // Affichage des 3 dernières leçons et des 3 derniers quizz créés.
    return (
        <>
            <section className='presentation'>
                <h1>Épicurieuses et épicurieux, bienvenue !</h1>
                <p>Cet environnement de quizz-learning est participatif ! Merci aux créateurs de contenu que sont les professeurs, formateurs et délivreurs de connaissances ! Grâce à vous, le site comprend déjà {lesson.length} leçon{lesson.length > 1 && "s"} et {quizz.length} quizz.</p>

                <p>Pour en profiter, c'est très simple ! Un visiteur ou un élève enregistré pourra consulter librement les leçons et quizz disponibles.</p>

                <p>Pour créer du contenu, une leçon ou un quizz, il faut être un utilisateur enregistré. Pour plus d'informations, vous pouvez vous rapporter à notre page <NavLink to="/aide" aria-label="Redirection vers la page d'aide et des questions fréquemment posées">Aide (FAQ)</NavLink>. Belles découvertes !</p>

            </section>

            <section className='presentation'>
                <h2>Les dernières leçons</h2>
                <ul className='lesson-list'>
                    {lesson
                        .sort((a, b) => b - a)
                        .slice(0, 3)
                        .map((lesson, i) => <CardLesson key={i} lesson={lesson} />)}
                </ul>
            </section>
            <section className='presentation'>
                <h2>Les derniers quizz</h2>
                <ul className='quizz-list'>
                    {quizz
                        .sort((a, b) => b - a)
                        .slice(0, 3)
                        .map((quizz, i) => <CardQuizz key={i} quizz={quizz} />)}
                </ul>
            </section>
        </>
    )
}

export default Home