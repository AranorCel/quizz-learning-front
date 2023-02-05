import React from 'react';
import axios from "axios"
import { useState, useEffect } from 'react';
import CardLesson from '../molecules/CardLesson';
import { NavLink } from "react-router-dom"

const Lessons = () => {

    const [lesson, setLesson] = useState([])
    const [rangeValue, setRangeValue] = useState(0);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/lesson")
            .then(res => setLesson(res.data.lesson))
    }, [lesson]);

    return (
        <>
            <p>Ajouter une <NavLink to="/addLesson">leçon</NavLink></p>

            <label>{lesson.length > 0 && `Nombre de leçons que vous souhaitez afficher entre 0 et ${lesson.length}`} : </label>

            {lesson.length !== 0 &&
                <>
                    <input type="range" min="0" max={lesson.length} defaultValue={rangeValue} onChange={(e) => setRangeValue(e.target.value)} />
                    <p>Vous affichez actuellement {rangeValue} leçon{rangeValue > 1 && "s"}</p>
                </>
            }

            <ul className='lesson-list'>
                {lesson
                    .slice(0, rangeValue)
                    .map((lesson, i) => <CardLesson key={i} lesson={lesson} />)}
            </ul>
        </>
    )
}

export default Lessons