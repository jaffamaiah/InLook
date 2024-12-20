import React, { useState } from 'react'
import { axiosClient, pages, errorHandler } from '../../utilities'
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate()

    function toggleForm() {
        setIsLogin(!isLogin)
    }

    async function logInUser() {
        if (email.length === 0)
            return alert('Email has been left blank!')
        if (password.length === 0)
            return alert('Password has been left blank!')

        try {
            await axiosClient.post('http://localhost:8080/login', {
                email: email,
                password: password
            })
            navigate(pages.MyJournal.path)
        } catch (error) {
            errorHandler(error)
        }
    }

    async function signUpUser() {
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
            navigate(pages.MyJournal.path)
        } catch (error) {
            errorHandler(error)
        }
    }

    return <div className='gradient-background' style={{height:'100vh', bottom:0}}>
        <h1>{isLogin ? pages.LogIn.name : 'Sign Up'}</h1>
    
        <button onClick={toggleForm}>
            {isLogin ? 'Switch to Sign Up' : 'Switch to Log In'}
        </button>

        {isLogin &&
            <div>
                <form>
                    <div>
                        <input type='email' onChange={(e) => setEmail(e.target.value)} />
                        <label for='email'> Email</label>
                    </div>

                    <div>
                        <input type='password' onChange={(e) => setPassword(e.target.value)} />
                        <label for='password'> Password</label>
                    </div>

                    <button type='button' onClick={logInUser} >Log In</button>
                </form>
            </div>
        }

        {!isLogin &&
            <div>
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

    </div>
}
