import React from 'react'
import { useNavigate } from "react-router-dom"

const Logout = () => {
    
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("quizz-learning");
        localStorage.removeItem("quizz-learning");
        navigate("/login");
    };

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