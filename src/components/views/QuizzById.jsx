import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizzById = () => {
    
    const { id } = useParams();
    const [quizz, setQuizz] = useState([]);
    const [status, setStatus] = useState("Le quizz existe");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/quizz/${id}`)
            .then(res => setQuizz(res.data.quizz))
    }, [id]);

    const handleDelete = async () => {
        await axios
            .delete(`http://localhost:8000/api/quizz/${id}`)
            .then(() => setStatus("Le quizz est supprimé"))
        handleClose();
        navigate("/quizz");
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /* const { status, quizz, handleClickOpen, handleClose, handleDelete, open} = useLesson() */

    return (
        <>
            <p>{status}</p>
            <h2>{quizz.title}</h2>
            <div className='card-flip'>
                <section className='card-front'>
                    <p>{quizz.description}</p>
                </section>
                <section className='card-back'>
                    <p>{quizz.author}</p>
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

export default QuizzById