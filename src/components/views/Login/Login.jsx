import React from 'react'
import { NavLink } from 'react-router-dom';
import { useLogin } from './useLogin';

const Login = () => {
    // Expérimentation d'un customHook pour séparer l'état d'une part du rendu d'autre part
    const { handleSubmit, email, setEmail, password, setPassword, error } = useLogin();

    return (
        <section className='presentation'>
            <h1>Se connecter</h1>
            <form onSubmit={handleSubmit} className="login-teacher">
                <label htmlFor="email">Votre email</label>
                <input
                    type="email"
                    value={email}
                    autoComplete="on"
                    onChange={(e) => setEmail(e.target?.value)}
                    required
                />
                <label htmlFor="password">Votre mot de passe</label>
                <input
                    type="password"
                    value={password}
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target?.value)}
                    required
                />
                {error && <p>{error}</p>}
                <button type="submit" aria-label="Se connecter">Se connecter</button>
            </form>
            <p>
                C'est votre première visite ? Il faut d'abord <NavLink to="/signup" aria-label="Redirection vers le formulaire de création de compte"> s'enregistrer</NavLink> !
            </p>
        </section>
    )
}

export default Login