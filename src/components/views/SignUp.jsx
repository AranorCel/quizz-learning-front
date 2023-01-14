import React from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'

const SignUp = () => {

    const { register, handleSubmit, isSubmit, reset } = useForm()

    const onSubmit = async data => {
        console.log(data)
        await axios
            .post("http://localhost:8000/signup/teacher", {
                email: data.email,
                password: data.password,
                firstname: data.firstname,
                lastname: data.lastname
            })
            .then((res) => {
                console.log(res);
            },
                (error) => {
                    console.log(error);
                }
            )
        reset();
    }

    return (
        <>
            <h1>S'enregistrer</h1>
            <form onSubmit={handleSubmit(onSubmit)} method='POST' className='login-teacher'>

                <label htmlFor="email">Votre email</label>
                <input type="email" name="email" id="email" {...register('email', { required: "Vous devez entrer une adresse mail valide" })} />

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
}

export default SignUp