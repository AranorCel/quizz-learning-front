import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VerifFieldLogin from '../../assets/templates/VerifFieldLogin';
import { useRecoilState } from "recoil"
import { teacherState, authState } from "../../store/Provider"

export const useLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [teacher, setTeacher] = useRecoilState(teacherState)
    const [auth, setAuth] = useRecoilState(authState)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await VerifFieldLogin.validate({ email, password });
            const response = await axios
                .post('http://localhost:8000/login/teacher', {
                    email,
                    password
                });
            const session = JSON.stringify({ email, isTeacher: response.data.isTeacher })
            sessionStorage.setItem("quizz-learning", session);
            localStorage.setItem("quizz-learning", session);
            setEmail("")
            setPassword("")
            setTeacher("teacher")
            setAuth("connected")
            navigate("/");
        } catch (err) {
            setError(err?.message);
            if (err?.response?.status === 404) {
                setError("Utilisateur inexistant");
            }
        }
    }
    return { handleSubmit, email, setEmail, password, setPassword, error, teacher }
};