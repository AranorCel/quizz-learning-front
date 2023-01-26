import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import VerifField from '../../assets/templates/VerifField';

const SignUp = () => {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { register, handleSubmit, reset } = useForm({ VerifField })
    const [status, setStatus] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    const onSubmit = async (data) => {
        console.log(data)
        try {
            await axios
                .post("http://localhost:8000/signup/teacher", {
                    email: data.email,
                    password: data.password,
                    firstname: data.firstname,
                    lastname: data.lastname
                })
            setStatus(true);
            setStatusMessage("Compte créé");
            reset();
        } catch (err) {
            if (err.response.status === 400) {
                setError("Email déjà utilisé");
            }
        }
    }

    if (!status) return (
        <>
            <h1>S'enregistrer</h1>
            <form onSubmit={handleSubmit(onSubmit)} method='POST' className='login-teacher'>

                <label htmlFor="email">Votre email</label>
                <input type="email" name="email" id="email" {...register('email', { required: "Vous devez entrer une adresse mail valide" })} />
                <p>{error}</p>

                <label htmlFor="password">Votre mot de passe</label>
                <input type="password" name="password" id="password" autoComplete="current-password" {...register('password', { required: true })} />

                <label htmlFor="firstname">Votre prénom</label>
                <input type="text" name="firstname" id="firstname" {...register('firstname', { required: true })} />

                <label htmlFor="lastname">Votre nom de famille</label>
                <input type="text" name="lastname" id="lastname" {...register('lastname', { required: true })} />

                <button onSubmit={handleSubmit(onSubmit)}>Se connecter</button>
            </form>
        </>
    )

    else return (
        <>
            <h1>Merci pour votre inscription et bienvenue sur Quizz Learning !</h1>
            <section>
                <p>Vous pouvez accéder :</p>
                <ul>
                    <li>
                        <NavLink to="/lessons">LEÇONS</NavLink>
                    </li>
                    <li>
                        <NavLink to="/quizz">QUIZZ</NavLink>
                    </li>
                </ul>

            </section>

        </>
    )
}

export default SignUp