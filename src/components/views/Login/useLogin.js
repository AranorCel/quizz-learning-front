import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import VerifFieldLogin from '../../../assets/templates/VerifFieldLogin';
import { useRecoilState } from "recoil"
import { teacherState, authState } from "../../../store/Provider"
import { yupResolver } from '@hookform/resolvers/yup'

export const useLogin = () => {

    // Utilisation de la fonction register et useForm de hook-form plus performante pour la gestion des formulaires car on évite les réactualisations d'état pour chaque modification de chaque input.
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(VerifFieldLogin) })
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [teacher, setTeacher] = useRecoilState(teacherState);
    const [, setAuth] = useRecoilState(authState);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            await VerifFieldLogin.validate({ ...data });
            const response = await axios
                .post('http://localhost:8000/login/teacher', {
                    ...data
                });
            const session = JSON.stringify({ isTeacher: response.data.isTeacher })
            sessionStorage.setItem("quizz-learning", session);
            localStorage.setItem("quizz-learning", session);
            setTeacher(true)
            setAuth(true)
            navigate("/");
        } catch (err) {
            setError(err?.message);
            if (err?.response?.status === 404) {
                setError("Utilisateur inexistant");
            }
        }
    }
    return { handleSubmit, onSubmit, errors, error, setError, teacher, setShowPassword, showPassword, register }
};