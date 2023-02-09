import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import CardLesson from '../molecules/CardLesson';
import CardQuizz from '../molecules/CardQuizz';

const Home = () => {

    const [lesson, setLesson] = useState([]);
    const [quizz, setQuizz] = useState([]);

    // Utilisation de useEffect pour l'affichage des leçons et quizz. Le tri n'est effectué qu'au niveau du render. Il aurait également été possible de créer des routes spécifiques uniques avec les filtres permettant de n'envoyer que 3 leçons / quizz. Optimisation ultérieure possible. Optimisation du render avec vérification des changements de "lesson" et de "quizz".
    useEffect(() => {
        if (lesson.length === 0) {
            axios
                .get("http://localhost:8000/api/lesson")
                .then(res => setLesson(res.data.lesson))
        }
    }, [lesson]);

    useEffect(() => {
        if (quizz.length === 0) {
            axios
                .get("http://localhost:8000/api/quizz")
                .then(res => setQuizz(res.data.quizz))
        }
    }, [quizz]);


    // Affichage des 3 dernières leçons et des 3 derniers quizz créés.
    return (
        <div className='presentation'>
            <section>
                <h1>Épicurieuses et épicurieux, bienvenue !</h1>
                <p>Cet environnement de quizz-learning est participatif ! Merci aux créateurs de contenu que sont les professeurs, formateurs et délivreurs de connaissances ! Grâce à vous, le site comprend déjà {lesson.length} leçon{lesson.length > 1 && "s"} et {quizz.length} quizz.</p>

                <p>Pour en profiter, c'est très simple ! Un visiteur ou un élève enregistré pourra consulter librement les leçons et quizz disponibles.</p>

                <p>Pour créer du contenu, une leçon ou un quizz, il faut être un utilisateur enregistré. Pour plus d'informations, vous pouvez vous rapporter à notre page <NavLink to="/aide" aria-label="Redirection vers la page d'aide et des questions fréquemment posées">Aide (FAQ)</NavLink>. Belles découvertes !</p>

            </section>

            <section>
                {lesson?.length > 0 ? (
                    <>
                        <h2>Les dernières leçons</h2>
                        <ul className='lesson-list'>
                            {lesson
                                .sort((a, b) => b - a)
                                .slice(0, 3)
                                .map((lesson, i) => <CardLesson key={i} lesson={lesson} />)}
                        </ul>
                    </>
                ) : (
                    <>
                        <h2>J'ai faim de leçon !</h2>
                        <p>Vite, tu peux créer une première leçon rapidement en cliquant sur le bouton ci-dessous.</p>
                        <button><NavLink to="/addLesson" aria-label="Redirection vers la page de création d'une leçon">Créer une leçon</NavLink></button>
                    </>
                )}
            </section>
            <section>
                {quizz?.length > 0 ? (
                    <>
                        <h2>Les derniers quizz</h2>
                        <ul className='quizz-list'>
                            {quizz
                                .sort((a, b) => b - a)
                                .slice(0, 3)
                                .map((quizz, i) => <CardQuizz key={i} quizz={quizz} />)}
                        </ul>
                    </>
                ) : (
                    <>
                        <h2>Et je suis gourmand aussi !</h2>
                        <p>Tu peux créer un premier quizz rapidement en cliquant sur le bouton ci-dessous.</p>
                        <button><NavLink to="/addQuizz" aria-label="Redirection vers la page de création d'un quizz">Créer un quizz</NavLink></button>
                    </>
                )}
            </section>
        </div>
    )
}

export default Home