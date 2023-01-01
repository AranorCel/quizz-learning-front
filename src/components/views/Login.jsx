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
        console.log(e.target.email.value, e.target.password.value)
        try {
            await axios
                .post("http://localhost:8000/login/teacher", {
                    email: e.target.email.value,
                    password: e.target.password.value
                });
            setEmail("");
            setPassword("");
            setSucces(true);
        } catch (error) {
            console.log(error);
            setSucces(false);
        };
    }

    return (
        <>
            {success ? (
                <section>
                    <h2>Vous êtes connectés !</h2>
                    <p>
                        Vous pouvez retourner à l'<NavLink to="/">accueil</NavLink> ou accéder à vos <NavLink to="/lessons"> leçons</NavLink>.
                    </p>

                </section>
            ) : (
                <>
                    <section>
                        <p ref={errorRef} className={error ? "error message" : "offscreen"} aria-live="assertive">{error}
                        </p>
                    </section>

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

                        <button type='submit'>Se connecter</button>
                    </form>

                    <p>
                        C'est votre première visite ? Il faut d'abord <NavLink to="/signup"> s'enregistrer</NavLink> !
                    </p>
                </>
            )}
        </>
    )
}

export default Login