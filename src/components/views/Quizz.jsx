import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom"
import CardQuizz from '../molecules/CardQuizz';

const Quizz = () => {

    const [quizz, setQuizz] = useState([])
    const [rangeValue, setRangeValue] = useState(0);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/quizz")
            .then(res => setQuizz(res.data.quizz))
    }, []);

    return (
        <>
            <p>Ajouter un <NavLink to="/addQuizz">quizz</NavLink></p>

            <label>{quizz.length > 0 && `Nombre de quizz que vous souhaitez afficher entre 0 et ${quizz.length}`} : </label>

            {quizz.length !== 0 &&
                <>
                    <input type="range" min="0" max={quizz.length} defaultValue={rangeValue} onChange={(e) => setRangeValue(e.target.value)} />
                    <p>Vous affichez actuellement {rangeValue} quizz</p>
                </>
            }

            <ul>
                {quizz
                    .slice(0, rangeValue)
                    .map((quizz, i) => <CardQuizz key={i} quizz={quizz} />)}
            </ul>
        </>
    )
}

export default Quizz