import React from 'react';
import axios from "axios"
import { useState, useEffect } from 'react';
import Card from '../atoms/Card';

const Lessons = () => {

    const [lesson, setLesson] = useState([])
    const [rangeValue, setRangeValue] = useState(2);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/lesson")
            .then(res => setLesson(res.data.lesson))
    }, []);

    return (
        <>
            <label>Nombre de leçons que vous souhaitez afficher entre 1 et {lesson.length} : </label>
            <input type="range" min="1" max={lesson.length} defaultValue={rangeValue} onChange={(e) => setRangeValue(e.target.value)} />
            <p>Vous affichez actuellement {rangeValue} leçons</p>
            <ul>
                {lesson
                    .slice(0, rangeValue)
                    .map((lesson, i) => <Card key={i} lesson={lesson} />)}
            </ul>
        </>
    )
}

export default Lessons