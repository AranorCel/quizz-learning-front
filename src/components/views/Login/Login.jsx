import React from 'react'
import { NavLink } from 'react-router-dom';
import { useLogin } from './useLogin';

const Login = () => {
    // Expérimentation d'un customHook pour séparer l'état d'une part du rendu d'autre part
    const { handleSubmit, email, setEmail, password, setPassword, error, setShowPassword, showPassword } = useLogin();

    return (
        <section className='presentation'>
            <h1>Se connecter</h1>
            <form onSubmit={handleSubmit} className="login-teacher">
                <label htmlFor="email">Votre email</label>
                <input
                    type="email"
                    name="email"
                    autoComplete="current-email"
                    onChange={(e) => setEmail(e.target?.value)}
                    required
                />
                <label htmlFor="password">Votre mot de passe</label>
                <input
                    type={showPassword ? "text" : "password"}
                    name="password" 
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target?.value)}
                    required
                />
                <div onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                    {showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                </div>
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