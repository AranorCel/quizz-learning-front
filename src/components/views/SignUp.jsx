import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VerifFieldSignUp from '../../assets/templates/VerifFieldSignUp';
import { useEffect } from 'react';

const SignUp = () => {

    const { register, handleSubmit, reset } = useForm({ VerifFieldSignUp })
    const [error, setError] = useState("");
    const [status, setStatus] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [counter, setCounter] = useState(5);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await axios
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
            if (err?.response?.status === 400) {
                setError("Email déjà utilisé");
            }
        }
    }

    useEffect(() => {
        let interval = null;
        if (status && counter > 0) {
            interval = setInterval(() => {
                setCounter(counter - 1);
            }, 1000);
        }
        if (counter === 0) {
            clearInterval(interval)
            navigate("/login")
        }
        return () => { clearInterval(interval) }
    }, [status, counter])

    if (!status) return (
        <>
            <h1>S'enregistrer</h1>
            <form onSubmit={handleSubmit(onSubmit)} method='POST' className='login-teacher'>

                <label htmlFor="email">Votre email</label>
                <input type="email" name="email" id="email" {...register('email', { required: "Vous devez entrer une adresse mail valide" })} />
                {error && <p>{error}</p>}

                <label htmlFor="password">Votre mot de passe</label>
                <input type="password" name="password" id="password" autoComplete="current-password" {...register('password', { required: true })} />

                <label htmlFor="firstname">Votre prénom</label>
                <input type="text" name="firstname" id="firstname" {...register('firstname', { required: true })} />

                <label htmlFor="lastname">Votre nom de famille</label>
                <input type="text" name="lastname" id="lastname" {...register('lastname', { required: true })} />

                <button onSubmit={handleSubmit(onSubmit)}>S'enregistrer</button>
            </form>
        </>
    )

    else return (
        <>
            {statusMessage && <p>{statusMessage}</p>}
            <h1>Merci pour votre inscription et bienvenue sur Quizz Learning !</h1>
            <section>
                <p>{`Vous allez être redirigés automatiquement vers la page de Connexion dans ${counter} seconde${(counter > 1) ? "s" : ""}.`}</p>
            </section>

        </>
    )
}

export default SignUp