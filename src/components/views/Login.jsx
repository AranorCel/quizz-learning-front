import React from 'react'

const Login = () => {
    return (
        <>
            <form action="" method='POST' className='login-teacher'>

                <label htmlFor="email">Votre email</label>
                <input type="email" name="email" />

                <label htmlFor="password">Votre mot de passe</label>
                <input type="password" name="password" />

                <button type='submit'>Se connecter</button>
            </form>
        </>
    )
}

export default Login