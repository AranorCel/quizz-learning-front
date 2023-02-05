import React from 'react'
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { teacherState, authState } from "../../store/Provider"

const Logout = () => {
    
    const [teacher, setTeacher] = useRecoilState(teacherState)
    const [auth, setAuth] = useRecoilState(authState)
    const navigate = useNavigate();
    const handleLogout = () => {
        // Stocker les data d'intérêt au niveau de la session (perte des informations dès la fermeture du navigateur) et dans le local storage (maintien des informations sur le poste)
        sessionStorage.removeItem("quizz-learning");
        localStorage.removeItem("quizz-learning");
        // Réinitialisation de l'état global du teacherState
        setTeacher(null)
        // Réinitialisation de l'état global de l'authentification par connexion simple peu importe le "rôle (teacher or student)"
        setAuth(null)
        // Enfin, après validation de la déconnexion, on revient sur la page de login
        navigate("/login");
    };

    // Possibilité d'annuler la déconnexion avec un simple navigate.
    const cancel = () => {
        navigate("/");
    };

    return (
        <>
            <p>Êtes-vous sûrs de vouloir vous déconnecter ?</p>
            <button type='submit' onClick={handleLogout}>Oui</button>
            <button type='submit' onClick={cancel}>Non</button>
        </>
    )
}

export default Logout