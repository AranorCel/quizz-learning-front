import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VerifFieldSignUp from '../../assets/templates/VerifFieldSignUp';
import { useEffect } from 'react';

const SignUp = () => {

    // Utilisation de la fonction register et useForm de hook-form plus performante pour la gestion des formulaires car on évite les réactualisations d'état pour chaque modification de chaque input.
    const { register, handleSubmit, reset } = useForm({ VerifFieldSignUp })
    const [error, setError] = useState("");
    const [status, setStatus] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [counter, setCounter] = useState(5);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        /* console.log(data) */
        try {
            const response = await axios
                .post("http://localhost:8000/signup/teacher", {
                    email: data.email,
                    password: data.password,
                    firstname: data.firstname,
                    lastname: data.lastname
                })
            setStatus(true);
            // Modification du message de statut de création de compte pour indiquer à l'utilisateur que cela a bien fonctionné.
            setStatusMessage("Compte créé");
            // La fonction reset intégrée à hook-form assure la réinitialisation des champs à vide. utile ici sans redirection et évite une erreur si l'utilisateur clique plusieurs fois. l'API identifierait que l'adresse mail est déjà utlisée et renverrait donc l'erreur ci-après.
            reset();

        } catch (err) {
            if (err?.response?.status === 400) {
                setError("Email déjà utilisé");
            }
        }
    }

    // Expérimentation d'un compteur de 5 secondes qui se déclenche automatiquement après la validation du formulaire d'inscription avant une redirection vers le login
    useEffect(() => {
        // Définir une variable locale mutable "interval" à null
        let interval = null;
        // Si compteur supérieur à 0 alors rafraichissement toutes les 1000 ms avec décrémentation de 1
        if (status && counter > 0) {
            interval = setInterval(() => {
                setCounter(counter - 1);
            }, 1000);
        }
        // Si compteur arrive à 0, on nettoie le composant et on effectue la redirection avec la méthode navigate de useNavigate()
        if (counter === 0) {
            clearInterval(interval)
            navigate("/login")
        }
        // Optimisation du render avec vérification du changement de status et du counter. Si pas de changement, on n'exécutera pas l'effet ce qui optimise les performances.
        return () => { clearInterval(interval) }
    }, [status, counter])

    // Si le statut est différent de sa valeur initiale alors il propose de s'enregistrer sinon, il lira le else suivant de validation / redirection.
    if (!status) return (
        <section className='presentation'>
            <h1>S'enregistrer</h1>
            <form onSubmit={handleSubmit(onSubmit)} method='POST' className='login-teacher'>

                <label htmlFor="email">Votre email</label>
                <input
                    type="email"
                    name="email"
                    {...register('email',
                        { required: "Vous devez entrer une adresse mail valide" })} />
                {error && <p>{error}</p>}

                <label htmlFor="password">Votre mot de passe</label>
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    {...register('password',
                        { required: true })} />
                <div onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }} className="eye">
                    {showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                </div>

                <label htmlFor="firstname">Votre prénom</label>
                <input
                    type="text"
                    name="firstname"
                    {...register('firstname',
                        { required: true })} />

                <label htmlFor="lastname">Votre nom de famille</label>
                <input
                    type="text"
                    name="lastname"
                    {...register('lastname',
                        { required: true })} />

                <button onSubmit={handleSubmit(onSubmit)}>S'enregistrer</button>
            </form>
        </section>
    )

    else return (
        <section className='presentation'>
            {statusMessage && <p>{statusMessage}</p>}
            <h1>Merci pour votre inscription et bienvenue sur Quizz Learning !</h1>
            <div>
                <p>{`Vous allez être redirigés automatiquement vers la page de Connexion dans ${counter} seconde${(counter > 1) ? "s" : ""}.`}</p>
            </div>
        </section>
    )
}

export default SignUp