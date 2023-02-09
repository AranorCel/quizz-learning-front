import React from 'react';
import { teacherState } from "../../store/Provider";
import { useRecoilValue } from 'recoil';
import { NavLink } from "react-router-dom";

const Create = () => {

    const isTeacher = useRecoilValue(teacherState);

    return (
        <section className='presentation'>
            <h1>Aux créateurs de contenu</h1>
            <p>Vous êtes ici pour partager et transmettre des connaissances et des curiosités. En quelques minutes vous pourrez préparer des <NavLink to="/addLesson" aria-label="Redirection vers la page de création d'une leçon">leçons</NavLink> et des <NavLink to="/addQuizz" aria-label="Redirection vers la page de création d'un quizz">quizz</NavLink>. Si vous voulez avoir plus d'informations sur la manière de les créer, nous vous invitons à lire l'<NavLink to="/aide" aria-label="Redirection vers la page d'aide et des questions fréquemment posées">aide (FAQ)</NavLink>.</p>
            
            <NavLink to="/addLesson" aria-label="Redirection vers la page de création d'une leçon"><button>Créer une leçon</button></NavLink>

            <NavLink to="/addQuizz" aria-label="Redirection vers la page de création d'un quizz"><button>Créer un quizz</button></NavLink>

            <p>Merci !</p>

        </section>
    )
}

export default Create