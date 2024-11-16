import React, { useState } from 'react'

import { axiosClient, pages, errorHandler } from '../../utilities'


export default function SignUp() {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const signUpUser = async () => {
        if (email.length === 0)
            return alert('Email has been left blank!')
        if (username.length === 0)
            return alert('Username has been left blank!')
        if (password.length <= 8)
            return alert('Password must be at least 8 characters in length!')

        try {
            let response = await axiosClient.post('http://localhost:8080/signup', {
                email: email,
                username: username,
                password: password
            })
            alert(response.data.msg)
        } catch (error) {
            errorHandler(error)
        }
    }


    return <div>
        <h1>{pages.SignUp.name}</h1>
        <form>
            <div>
                <input type='email' onChange={(e) => setEmail(e.target.value)} />
                <label for='email'> Email</label>
            </div>

            <div>
                <input type='username' onChange={(e) => setUsername(e.target.value)} />
                <label for='username'> Username</label>
            </div>

            <div>
                <input type='password' onChange={(e) => setPassword(e.target.value)} />
                <label for='password'> Password</label>
            </div>

            <button type='button' onClick={signUpUser} >Sign Up</button>
        </form>
    </div>
}
