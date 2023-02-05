import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { teacherState } from "../../store/Provider"
import { useRecoilValue } from 'recoil'

const LessonById = () => {

    const { id } = useParams();
    const [lesson, setLesson] = useState([]);
    const [status, setStatus] = useState("La leçon existe");
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const isTeacher = useRecoilValue(teacherState)

    // Utilisation d'un useEffect pour l'affichage d'une leçon unique ciblée par son id ce qui optimise la réponse de l'API vers l'affichage puisqu'une seule leçon est envoyée. 
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/lesson/${id}`)
            .then(res => setLesson(res.data.lesson))
    }, [id]);

     // Possibilité de supprimer la leçon. Fenêtre de validation avant suppression définitive de la DB ce qui limite la suppression accidentelle. Puis, redirection vers la page commune des leçons ce qui permet de voir les leçons restantes ou d'en créer immédiatemment une nouvelle.
    const handleDelete = async () => {
        await axios
            .delete(`http://localhost:8000/api/lesson/${id}`)
            .then(() => setStatus("La leçon est supprimée"))
        handleClose();
        navigate("/lessons");
    }

    // Navigation entre les points de la leçon avec la question suivante et bouclage infini haut et bas avec le modulo. Ici, il s'agit d'accéder à la question suivante.
    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % lesson.knowledges.length);
    };

    // Ici, il s'agit de revenir à la question précédente.
    const handlePrevious = () => {
        setCurrentIndex((currentIndex - 1 + lesson.knowledges.length) % lesson.knowledges.length);
    };

    // Gestion de l'état de la fenêtre de confirmation pour la suppression de la leçon.
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
                        <p>Question : {lesson?.knowledges[currentIndex]?.question}</p>
                    ) : ""}
                </section>
                <section className='card-back'>
                    {lesson.knowledges ? (
                        <p>Réponse : {lesson?.knowledges[currentIndex]?.answer}</p>
                    ) : ""}
                </section>
            </div>

            {isTeacher ? (
                <>
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
            ) : ("")}
        </>
    )
}

export default LessonById