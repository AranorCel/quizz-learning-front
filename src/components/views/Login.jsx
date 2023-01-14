import React, { useRef, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const userRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSucces] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setError("");
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios
            .post("http://localhost:8000/login/teacher", {
                email: e.target.email.value,
                password: e.target.password.value
            });
            // Reset field after onSubmit
            setEmail("");
            setPassword("");
            // Send email and role in session storage
            sessionStorage.setItem({"email": email, "role" : role});
            // Change success's state then display
            setSucces(true);

        } catch (error) {
            if (error.response.status === 400 || error.response.status === 404) { setError("Identifiant ou mot de passe incorrect") };
            setSucces(false);
        };
    }
    if (success) return (
        <section>
            <h2>Vous êtes connectés !</h2>
            <p>
                Vous pouvez retourner à l'<NavLink to="/">accueil</NavLink> ou accéder à vos <NavLink to="/lessons"> leçons</NavLink>.
            </p>
        </section>
    )
    else return (
        <>
            <h1>Se connecter</h1>
            <form onSubmit={handleSubmit} method='POST' className='login-teacher'>

                <label htmlFor="email">Votre email</label>
                <input
                    type="email"
                    name="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor="password">Votre mot de passe</label>
                <input
                    type="password"
                    name="password"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />

                <p ref={errorRef} className={error ? "error message" : ""} aria-live="assertive">{error}
                </p>
                <button type='submit'>Se connecter</button>
            </form>


            <p>
                C'est votre première visite ? Il faut d'abord <NavLink to="/signup"> s'enregistrer</NavLink> !
            </p>
        </>
    )
}

export default Login