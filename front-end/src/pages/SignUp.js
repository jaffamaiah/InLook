import React, { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function SignUp() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const signUpUser = () => {
    if (username.length === 0)
      return alert("Username has been left blank!")
    if (password.length <= 8)
      return alert("Password must be at least 8 characters in length!")

    axios.post('http://localhost:8080/signup', {
      username: username,
      password: password
    })
      .then((response) => {
        console.log(response)
        // navigate("/")
        alert("check console for response from server")
      })
      .catch((error) => {
        if (error.status === 401) {
          alert(error.response.data.msg)
        } else {
          alert("Error has ocurred")
          console.log(error)
        }
      })
  }


  return (<div>
    <h1>Sign Up</h1>
    <form>
      <div>
        <input type="username" onChange={(e) => setUsername(e.target.value)} />
        <label for="username"> Username</label>
      </div>

      <div>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <label for="password"> Password</label>
      </div>

      <button type="button" onClick={signUpUser} >Log In</button>
    </form>
  </div>)
}
