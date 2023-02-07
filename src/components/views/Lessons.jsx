import React from 'react';
import axios from "axios"
import { useState, useEffect } from 'react';
import CardLesson from '../molecules/CardLesson';
import { NavLink } from "react-router-dom"
import { teacherState } from "../../store/Provider"
import { useRecoilValue } from 'recoil'

const Lessons = () => {

    const [lesson, setLesson] = useState([])
    const [rangeValue, setRangeValue] = useState(0);
    const isTeacher = useRecoilValue(teacherState);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/lesson")
            .then(res => setLesson(res.data.lesson))
    }, [lesson]);

    return (
        <section className='presentation'>
            <h1>Commençons par... les leçons !</h1>

            <p>Il faut bien débuter par quelque chose et nous vous proposons d'apprendre en nous amusant grâce à un modèle interactif. Jouez avec le curseur, choisissez une leçon et c'est parti ! Vous pourrez apprendre une nouvelle notion et vérifier le résultat en passant simplement votre curseur sur la question. Simple et efficace ! Quand vous vous sentirez prêts, nous passerons aux choses sérieuses en parcourant les quizz !</p>

            <button><NavLink to="/addLesson" aria-label="Redirection vers la page de création d'une leçon">Créer une leçon</NavLink></button>

            {lesson.length !== 0 &&
                <>
                    <p><b>Dépalcez le curseur </b> pour afficher des leçons. {rangeValue > 0 && "Bravo vous avez accès à"} {rangeValue} leçon{rangeValue > 1 && "s !"}</p>

                    <p>{rangeValue > 0 ? `Bravo vous avez accès à${rangeValue} leçon`:""}</p>

                    <input type="range" min="0" max={lesson.length} defaultValue={rangeValue} onChange={(e) => setRangeValue(e.target.value)} />
                </>
            }

            <ul className='lesson-list'>
                {lesson
                    .slice(0, rangeValue)
                    .map((lesson, i) => <CardLesson key={i} lesson={lesson} />)}
            </ul>

        </section>
    )
}

export default Lessons