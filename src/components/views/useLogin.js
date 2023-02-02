import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VerifFieldLogin from '../../assets/templates/VerifFieldLogin';

export const useLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await VerifFieldLogin.validate({ email, password });
            const response = await axios
                .post('http://localhost:8000/login/teacher', {
                    email,
                    password
                });
            const session = JSON.stringify({email,isTeacher:response.data.isTeacher})
            sessionStorage.setItem("quizz-learning", session);
            localStorage.setItem("quizz-learning", session);
            setEmail("")
            setPassword("")
            navigate("/");
        } catch (err) {
            setError(err?.message);
            if (err?.response?.status === 404) {
                setError("Utilisateur inexistant");
            }
        }
    }
    return { handleSubmit, email, setEmail, password, setPassword, error }
};