import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LessonById = () => {

    const { id } = useParams();
    const [lesson, setLesson] = useState([]);
    const [status, setStatus] = useState("La leçon existe");
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/lesson/${id}`)
            .then(res => setLesson(res.data.lesson))
    }, [id]);

    const handleDelete = async () => {
        await axios
            .delete(`http://localhost:8000/api/lesson/${id}`)
            .then(() => setStatus("La leçon est supprimée"))
        handleClose();
        navigate("/lessons");
    }

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % lesson.knowledges.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((currentIndex - 1 + lesson.knowledges.length) % lesson.knowledges.length);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <h2>{lesson.title}</h2>
            <p>{lesson.description}</p>
            <div>
                <button className="button" onClick={handlePrevious}>Précédent</button>
                <button className="button" onClick={handleNext}>Suivant</button>
            </div>
            <div className='card-flip'>
                <section className='card-front'>
                    {lesson.knowledges ? (
                        <p>{lesson?.knowledges[currentIndex]?.question}</p>
                    ) : ""}
                </section>
                <section className='card-back'>
                    {lesson.knowledges ? (
                        <p>{lesson?.knowledges[currentIndex]?.answer}</p>
                    ) : ""}
                </section>
            </div>
            <div>
                <button className="button">Éditer</button>
            </div>
            <div>
                <button className="button" onClick={handleClickOpen}>Supprimer</button>
                <dialog className="dialog" open={open} onClose={handleClose}>
                    Confirmez la suppression
                    <button className="button dialog-cancel" onClick={handleClose}>Annuler</button>
                    <button className="button dialog-delete" onClick={handleDelete}>Supprimer</button>
                </dialog>
            </div>
        </>
    )
}

export default LessonById