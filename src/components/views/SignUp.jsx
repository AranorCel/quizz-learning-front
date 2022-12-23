import React from 'react'

const SignUp = () => {

    const handleSumbit = (e) => {
        e.preventDefault()
        console.log(e)
    }

    return (
        <>
            <form action="" method='POST' className='login-teacher'>

                <label htmlFor="email">Votre email</label>
                <input type="email" name="email" />

                <label htmlFor="password">Votre mot de passe</label>
                <input type="password" name="password" />

                <label htmlFor="firstname">Votre prénom</label>
                <input type="text" name="firstname" />

                <label htmlFor="lastname">Votre nom de famille</label>
                <input type="text" name="lastname" />

                {/* <input type="hidden" name="isTeacher" value="true"/>

                <input type="hidden" name="isAdmin" value="false"/> */}

                <button type='submit' onClick={handleSumbit}>Se connecter</button>
            </form>
        </>
    )
}

export default SignUp