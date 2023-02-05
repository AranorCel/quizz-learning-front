import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { teacherState } from "../../store/Provider"
import { useRecoilValue } from 'recoil'

const QuizzById = () => {

    const { id } = useParams();
    const [quizz, setQuizz] = useState([]);
    const [status, setStatus] = useState("Le quizz existe");
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const isTeacher = useRecoilValue(teacherState)

    // Utilisation d'un useEffect pour l'affichage d'un quizz unique ciblé par son id ce qui optimise la réponse de l'API vers l'affichage puisqu'un seul quizz est envoyé. 
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/quizz/${id}`)
            .then(res => setQuizz(res.data.quizz))
    }, [id]);

    // Possibilité de supprimer le quizz. Fenêtre de validation avant suppression définitive de la DB ce qui limite la suppression accidentelle. Puis, redirection vers la page commune des quizz ce qui permet de voir les quizz restants ou d'en créer immédiatemment un nouveau.
    const handleDelete = async () => {
        await axios
            .delete(`http://localhost:8000/api/quizz/${id}`)
            .then(() => setStatus("Le quizz est supprimé"))
        handleClose();
        navigate("/quizz");
    }

    // Navigation entre les questions du quizz avec la question suivante et bouclage infini haut et bas avec le modulo. Ici, il s'agit d'accéder à la question suivante.
    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % quizz.tests.length);
    };

    // Ici, il s'agit de revenir à la question précédente.
    const handlePrevious = () => {
        setCurrentIndex((currentIndex - 1 + quizz.tests.length) % quizz.tests.length);
    };

    // Gestion de l'état de la fenêtre de confirmation pour la suppression du quizz.
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <h2>{quizz.title}</h2>
            <p>{quizz.description}</p>
            <div>
                <button className="button" onClick={handlePrevious}>Précédent</button>
                <button className="button" onClick={handleNext}>Suivant</button>
            </div>
            <div>
                <section >
                    {quizz.tests ? (
                        <p>Question : {quizz?.tests[currentIndex][0][1]}</p>
                    ) : ""}
                </section>
                <section >
                    {quizz.tests ? (
                        <>
                            <p>Choix 1 : {quizz?.tests[currentIndex][2][1]}</p>
                            <p>Choix 2 : {quizz?.tests[currentIndex][3][1]}</p>
                            <p>Choix 3 : {quizz?.tests[currentIndex][4][1]}</p>
                            <p>Choix 4 : {quizz?.tests[currentIndex][5][1]}</p>
                        </>
                    ) : ""}
                </section>
                <section >
                    {quizz.tests ? (
                        <p hidden>Réponse : {quizz?.tests[currentIndex][1][1]}</p>
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

export default QuizzById