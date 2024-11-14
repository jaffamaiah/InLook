import './LogOutButton.css'


export default function LogOutButton() {

    function logOut() {
        //TODO
        console.log("logged out")
    }

    return <div id='logout-button' className='logout-button' onClick={logOut}>
        Log Out
        <img id='logout-icon' src='/NavBar/Log_Out.svg' alt='' />
    </div>
}
