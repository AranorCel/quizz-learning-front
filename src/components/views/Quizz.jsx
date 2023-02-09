import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom"
import CardQuizz from '../molecules/CardQuizz';
import { teacherState } from "../../store/Provider"
import { useRecoilValue } from 'recoil'

const Quizz = () => {

    const [quizz, setQuizz] = useState([])
    const [rangeValue, setRangeValue] = useState(0);
    const isTeacher = useRecoilValue(teacherState);

    useEffect(() => {
        if (quizz.length === 0) {
        axios
            .get("http://localhost:8000/api/quizz")
            .then(res => setQuizz(res.data.quizz))
        }
    }, [quizz]);

    return (
        <section className='presentation'>
            <h1>Amusons-nous avec... les quizz !</h1>

            <p>Après l'apprentissage, il est désormais temps de passer aux tests pour consolider nos acquis ! A vos souris ! Comme pour les <NavLink to="/lessons" aria-label="Redirection vers la page des leçons">leçons</NavLink>, commencez par jouer avec le curseur, choisissez un quizz et c'est parti ! Testez vos compétences !</p>

            {quizz.length !== 0 &&
                <>
                    <p><b>Dépalcez le curseur </b> pour afficher des quizz. {rangeValue > 0 ? `Bravo vous avez accès à ${rangeValue} quizz.`:""}</p>

                    <input type="range" min="0" max={quizz.length} defaultValue={rangeValue} onChange={(e) => setRangeValue(e.target.value)} />
                </>
            }

            <ul className='quizz-list'>
                {quizz
                    .slice(0, rangeValue)
                    .map((quizz, i) => <CardQuizz key={i} quizz={quizz} />)}
            </ul>
        </section>
    )
}

export default Quizz