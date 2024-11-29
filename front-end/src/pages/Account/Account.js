import { useState } from "react"
import { pages, ProtectedPage, axiosClient, errorHandler } from "../../utilities"

import "./Account.css"

export default function Account() {

    const [newEmail, setNewEmail] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [deletePassword, setDeletePassword] = useState('')

    async function updateEmail() {
        if (newEmail.length === 0)
            return alert('Email has been left blank!')
        updateUserInfo({ email: newEmail })
    }

    async function updateUsername() {
        if (newUsername.length === 0)
            return alert('Username has been left blank!')
        updateUserInfo({ username: newUsername })
    }

    async function updatePassword() {
        if (newPassword.length <= 8)
            return alert('Password must be at least 8 characters in length!')
        updateUserInfo({ password: newPassword })
    }

    async function updateUserInfo(params) {
        try {
            let response = await axiosClient.post('http://localhost:8080/<endpoint>', params) //TODO: set endpoint
            alert(response.data.msg)
        } catch (error) {
            errorHandler(error)
        }
    }

    async function deleteAccount() {
        try {
            let response = await axiosClient.post('http://localhost:8080/<endpoint>', { //TODO: set endpoint
                password: deletePassword
            })
            alert(response.data.msg)
        } catch (error) {
            errorHandler(error)
        }
    }

    async function changeProfilePicture() {
        //TODO
        console.log("changed pfp")
    }

    return <>
        <div className='profile-picture-section'>
            <div className='profile-section' onClick={changeProfilePicture}>
                <img src='/NavBar/Account_Circle.svg' alt='' />
                <div>Change picture</div>
            </div>
            <div />
        </div>

        <div className='account-settings-section'>
            <h1>{pages.Account.name}</h1>
            <form>
                <div>
                    <input type='email' onChange={(e) => setNewEmail(e.target.value)} />
                    <button type='button' onClick={updateEmail} >Change Email</button>
                </div>
                <div>
                    <input type='username' onChange={(e) => setNewUsername(e.target.value)} />
                    <button type='button' onClick={updateUsername} >Change Username</button>
                </div>
                <div>
                    <input type='password' onChange={(e) => setNewPassword(e.target.value)} />
                    <button type='button' onClick={updatePassword} >Change Password</button>
                </div>
            </form>
        </div>

        <div className='account-deletion-section'>
            <h2>Danger Zone</h2>
            <div>
                <h3>Enter Password to delete account</h3>
                <input type='password' onChange={(e) => setDeletePassword(e.target.value)} />
                <button type='button' onClick={deleteAccount} >Delete Account</button>
            </div>
        </div>

        <ProtectedPage />
    </>
}
