import React, { useState } from 'react'
import { axiosClient } from '../../utilities';

export default function LogIn() {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const testAccess = async () => {
        try {
            const response = await axiosClient.get('http://localhost:8080/protected');
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const logInUser = async () => {
        if (username.length === 0)
            return alert('Username has been left blank!')
        if (password.length === 0)
            return alert('Password has been left blank!')

        try {
            await axiosClient.post('http://localhost:8080/login', {
                username: username,
                password: password
            })
        } catch (error) {
            console.error(error);
        }

    }


    return <div>
        <h1>Log In</h1>
        <form>
            <div>
                <input type='username' onChange={(e) => setUsername(e.target.value)} />
                <label for='username'> Username</label>
            </div>

            <div>
                <input type='password' onChange={(e) => setPassword(e.target.value)} />
                <label for='password'> Password</label>
            </div>

            <button type='button' onClick={logInUser} >Log In</button>
            <button type='button' onClick={testAccess} >Test Access</button>
        </form>
    </div>
}
