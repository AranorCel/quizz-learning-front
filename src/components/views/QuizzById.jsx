import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { teacherState } from "../../store/Provider"
import { useRecoilValue } from 'recoil'

const QuizzById = () => {

    const { id } = useParams();
    const [quizz, setQuizz] = useState({});
    const [status, setStatus] = useState("Le quizz existe");
    const [openToDelete, setOpenToDelete] = useState(false);
    const [openToUpdate, setOpenToUpdate] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [finish, setFinsih] = useState(false);
    const navigate = useNavigate();
    const isTeacher = useRecoilValue(teacherState);

    // Utilisation d'un useEffect pour l'affichage d'un quizz unique ciblé par son id ce qui optimise la réponse de l'API vers l'affichage puisqu'un seul quizz est envoyé. 
    useEffect(() => {
        if (!Object.keys(quizz).length) {
            axios
                .get(`http://localhost:8000/api/quizz/${id}`)
                // Transformation de l'objet créé afin de lui ajouter une nouvelle key/value pour les choix cochés par l'utilisateur pour chaque question.
                .then(res => {
                    const data = res.data.quizz;
                    for (let i = 0; i < data.tests.length; i++) {
                        for (let j = 0; j < data.tests[i].choices.length; j++) {
                            data.tests[i].choices[j].chosen = false
                        }
                    }
                    setQuizz(data)
                })
        }
    }, [quizz]);

    // Possibilité de supprimer le quizz. Fenêtre de validation avant suppression définitive de la DB ce qui limite la suppression accidentelle. Puis, redirection vers la page commune des quizz ce qui permet de voir les quizz restants ou d'en créer immédiatemment un nouveau.
    const handleDelete = async () => {
        await axios
            .delete(`http://localhost:8000/api/quizz/${id}`)
            .then(() => setStatus("Le quizz est supprimé"))
        handleCloseToDelete();
        navigate("/quizz");
    }

    const handleUpdate = async () => {
        await axios
            .put(`http://localhost:8000/api/lesson/${id}`)
            .then(() => setStatus("Le quizz est modifié"))
        handleCloseToUpdate();
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
    const handleClickOpenToDelete = () => {
        setOpenToDelete(true);
    };

    const handleCloseToDelete = () => {
        setOpenToDelete(false);
    };

    // Gestion de l'état de la fenêtre de confirmation pour l'édition du quizz.
    const handleClickOpenToUpdate = () => {
        setOpenToUpdate(true);
    };

    const handleCloseToUpdate = () => {
        setOpenToUpdate(false);
    };

    const handleCheckboxChange = (currentIndex, i) => {
        const newQuizz = { ...quizz };
        newQuizz.tests[currentIndex].choices[i].chosen = !newQuizz.tests[currentIndex].choices[i].chosen;
        setQuizz(newQuizz);
    };

    // initiatlisation de la note à 0 avant le test
    let results = 0;

    if (finish && results === 0) {
        const values = quizz.tests.map(test => test.choices.reduce((a, b) => (b.chosen === b.check) && a, true));
        results = values.reduce((a, b) => ((b ? 1 : 0) + a), results);
    }

    const handleValidate = () => {
        setFinsih(true);

    }

    return (
        <div className='quizz'>
            <h2>{quizz?.title}</h2>
            <p>{quizz?.description}</p>
            {!finish && (
                <div className='quizz-card'>
                    <section >
                        <p>Votre avancement sur le quizz : <progress max={quizz?.tests?.length} value={currentIndex + 1}></progress></p>
                        {quizz?.tests ? (
                            <p><b>Question {currentIndex + 1} :</b> {quizz?.tests[currentIndex].question}</p>
                        ) : ""}
                    </section>
                    <section className='quizz-questions'>
                        {quizz?.tests ? (
                            <div className="quizz-choices">
                                <p>Cochez la ou les bonnes réponses :</p>

                                {quizz?.tests[currentIndex]?.choices?.map((choice, i) => (
                                    <div className="quizz-choice" key={i}>
                                        <input
                                            type="checkbox"
                                            className='checkbox'
                                            onChange={() => handleCheckboxChange(currentIndex, i)}
                                            /* quizz?.tests[currentIndex].choices[i].label */
                                            checked={choice.chosen}
                                        />
                                        Choix {i + 1} : {choice.label}
                                    </div>
                                ))}
                            </div>
                        ) : ""}
                        <div>
                            <button className="button" onClick={handlePrevious}>Précédent</button>
                            <button className="button" onClick={handleNext}>Suivant</button>
                        </div>
                        {(currentIndex + 1 === quizz?.tests?.length) && (
                            <>
                                <p>C'est la dernière question, vous pouvez revenir en arrière avant de valider !</p>
                                <button className='button-validate' onClick={handleValidate}>Valider</button>
                            </>
                        )}
                    </section>
                </div>
            )}


            {finish && <p>Votre résultat pour ce quizz est {results}/{quizz.tests.length}</p>
            }

            {isTeacher ? (
                <div className='creator-card'>
                    <p>Vous êtes un créateur de contenu vous pouvez : </p>

                    <dialog className="dialog-update" open={openToUpdate} onClose={handleCloseToUpdate}>
                        Confirmez l'édition
                        <button className="button dialog-cancel" onClick={handleCloseToUpdate}>Annuler</button>
                        <button className="button dialog-update" onClick={handleUpdate}>Éditer</button>
                    </dialog>

                    <button className="button-update" onClick={handleClickOpenToUpdate}>Éditer le quizz</button>

                    <dialog className="dialog-delete" open={openToDelete} onClose={handleCloseToDelete}>
                        Confirmez la suppression
                        <button className="button dialog-cancel" onClick={handleCloseToDelete}>Annuler</button>
                        <button className="button dialog-delete" onClick={handleDelete}>Supprimer</button>
                    </dialog>

                    <button className="button-delete" onClick={handleClickOpenToDelete}>Supprimer le quizz</button>
                </div>
            ) : ("")}
        </div>
    )
}

export default QuizzById