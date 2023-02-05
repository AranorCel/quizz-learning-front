import React from 'react';
import axios from "axios"
import { useState, useEffect } from 'react';
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
            <section>
                <p>Les dernières leçons :</p>
                <ul className='lesson-list'>
                    {lesson
                        .sort((a, b) => b - a)
                        .slice(0, 3)
                        .map((lesson, i) => <CardLesson key={i} lesson={lesson} />)}
                </ul>
            </section>
            <section>
                <p>Les derniers quizz :</p>
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