import React from 'react';
import axios from "axios"
import { useState, useEffect } from 'react';
import CardLesson from '../molecules/CardLesson';
import CardQuizz from '../molecules/CardQuizz';

const Home = () => {

    const [lesson, setLesson] = useState([])
    const [quizz, setQuizz] = useState([])

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

    return (
        <>
            <section>
                <p>Les dernières leçons :</p>
                <ul>
                    {lesson
                        .sort((a, b) => b - a)
                        .slice(0, 3)
                        .map((lesson, i) => <CardLesson key={i} lesson={lesson} />)}
                </ul>
            </section>
            <section>
                <p>Les derniers quizz :</p>
                <ul>
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