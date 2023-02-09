import React from 'react'
import { NavLink } from 'react-router-dom';
import { useLogin } from './useLogin';

const Login = () => {
    // Expérimentation d'un customHook pour séparer l'état d'une part du rendu d'autre part
    const { handleSubmit, onSubmit, errors, register, error, setError, setShowPassword, showPassword } = useLogin();

    return (
        <section className='presentation'>
            <h1>Se connecter</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="login-teacher">
                <label htmlFor="email">Votre email</label>
                <input
                    name="email"
                    autoComplete="current-email"
                    {...register('email')}
                />
                {errors.email && <p className='yup-error'>{errors.email.message}</p>}

                <label htmlFor="password">Votre mot de passe</label>
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    {...register('password')}
                />
                <div onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                    {showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                </div>
                {errors.password && <p className='yup-error'>{errors.password.message}</p>}

                {error && <p className='yup-error'>{error}</p>}
                <button type="submit" aria-label="Se connecter">Se connecter</button>
            </form>
            <p>
                C'est votre première visite ? Il faut d'abord <NavLink to="/signup" aria-label="Redirection vers le formulaire de création de compte"> s'enregistrer</NavLink> !
            </p>
        </section>
    )
}

export default Login