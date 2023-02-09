import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { teacherState } from "../../store/Provider"
import { useRecoilValue } from 'recoil'

const LessonById = () => {

    const { id } = useParams();
    const [lesson, setLesson] = useState([]);
    const [status, setStatus] = useState("La leçon existe");
    const [openToDelete, setOpenToDelete] = useState(false);
    const [openToUpdate, setOpenToUpdate] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const isTeacher = useRecoilValue(teacherState);

    // Utilisation d'un useEffect pour l'affichage d'une leçon unique ciblée par son id ce qui optimise la réponse de l'API vers l'affichage puisqu'une seule leçon est envoyée. 
    useEffect(() => {
        if (!Object.keys(lesson).length) {
            axios
                .get(`http://localhost:8000/api/lesson/${id}`)
                .then(res => setLesson(res.data.lesson))
        }
    }, [lesson]);

    // Possibilité de supprimer la leçon. Fenêtre de validation avant suppression définitive de la DB ce qui limite la suppression accidentelle. Puis, redirection vers la page commune des leçons ce qui permet de voir les leçons restantes ou d'en créer immédiatemment une nouvelle.
    const handleDelete = async () => {
        await axios
            .delete(`http://localhost:8000/api/lesson/${id}`)
            .then(() => setStatus("La leçon est supprimée"))
        handleCloseToDelete();
        navigate("/lessons");
    }

    const handleUpdate = () => {
        navigate("/addLesson", {state : lesson});
        handleCloseToUpdate();
       /*  await axios
            .put(`http://localhost:8000/api/lesson/${id}`)
            .then(() => setStatus("La leçon est modifiée")) */
    }

    // Navigation entre les points de la leçon avec la question suivante et bouclage infini haut et bas avec le modulo. Ici, il s'agit d'accéder à la question suivante.
    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % lesson?.knowledges?.length);
    };

    // Ici, il s'agit de revenir à la question précédente.
    const handlePrevious = () => {
        setCurrentIndex((currentIndex - 1 + lesson?.knowledges?.length) % lesson?.knowledges?.length);
    };

    // Gestion de l'état de la fenêtre de confirmation pour la suppression de la leçon.
    const handleClickOpenToDelete = () => {
        setOpenToDelete(true);
    };

    const handleCloseToDelete = () => {
        setOpenToDelete(false);
    };

    // Gestion de l'état de la fenêtre de confirmation pour l'édition de la leçon.
    const handleClickOpenToUpdate = () => {
        setOpenToUpdate(true);
    };

    const handleCloseToUpdate = () => {
        setOpenToUpdate(false);
    };

    // Afficher une nouvelle notion par une "carte" recto/verso qui présente la question. L'apprenant essaye alors d'y répondre. Il vérifie si sa réponse est bonne en déplaçant le curseur de la souris sur la "carte". Il peut ainsi réfléchir avant de voir la solution et de manière interactive sans cliquer sur un bouton "Montre moi la réponse".
    return (
        <>
            <div className='lesson'>
                <h2>{lesson.title}</h2>
                <p>{lesson.description}</p>
                <div>
                    <button className="button" onClick={handlePrevious}>Précédent</button>
                    <button className="button" onClick={handleNext}>Suivant</button>
                </div>
                <div className='card-flip'>
                    <section className='card-front'>
                        {lesson.knowledges ? (
                            <p><b>Question {currentIndex + 1} :</b> {lesson?.knowledges[currentIndex]?.question}</p>
                        ) : ""}
                    </section>
                    <section className='card-back'>
                        {lesson.knowledges ? (
                            <p><b>Réponse {currentIndex + 1} :</b> {lesson?.knowledges[currentIndex]?.answer}</p>
                        ) : ""}
                    </section>
                </div>


                {isTeacher ? (
                    <div className='creator-card'>
                        <p>Vous êtes un créateur de contenu vous pouvez : </p>

                        <dialog className="dialog-update" open={openToUpdate} onClose={handleCloseToUpdate}>
                            Confirmez l'édition
                            <button className="button dialog-cancel" onClick={handleCloseToUpdate}>Annuler</button>
                            <button className="button dialog-update" onClick={handleUpdate}>Éditer</button>
                        </dialog>

                        <button className="button-update" onClick={handleClickOpenToUpdate}>Éditer la leçon</button>

                        <dialog className="dialog-delete" open={openToDelete} onClose={handleCloseToDelete}>
                            Confirmez la suppression
                            <button className="button dialog-cancel" onClick={handleCloseToDelete}>Annuler</button>
                            <button className="button dialog-delete" onClick={handleDelete}>Supprimer</button>
                        </dialog>

                        <button className="button-delete" onClick={handleClickOpenToDelete}>Supprimer la leçon</button>
                    </div>
                ) : ("")}
            </div>
        </>
    )
}

export default LessonById