import { axiosClient, pages, errorHandler } from '../../utilities'
import './LogOutButton.css'


export default function LogOutButton() {

    async function logOut() {
        try {
            let response = await axiosClient.post('http://localhost:8080/logout', {})
            alert(response.data.msg)
            window.location.href = pages.Home.path
        } catch (error) {
            errorHandler(error)
        }
    }

    return <div id='logout-button' className='logout-button' onClick={logOut}>
        Log Out
        <img id='logout-icon' src='/NavBar/Log_Out.svg' alt='' />
    </div>
}
