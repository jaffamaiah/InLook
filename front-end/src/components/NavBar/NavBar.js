import React, { useState } from 'react'

import './NavBar.css'
import { pages } from '../../utilities'

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(true)

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    return <>

        {/* <div className={`sidebar-defocus-area ${isOpen ? 'open' : ''}`} onClick={toggleSidebar} /> */}

        <nav id='sidebar' className={`sidebar ${isOpen ? 'open' : ''}`}>
            <img id='x' className='x' src='/NavBar/X.svg' onClick={toggleSidebar} />

            <a className='profile-section'>
                <img id='account-circle' src='/NavBar/Account_Circle.svg' />
                <div>My Profile</div>
            </a>

            <ul className='nav-links'>
                <li>
                    <a id='writejournal'>
                        <img id='edit' src='/NavBar/Edit.svg' />
                        Write Journal
                    </a>
                </li>
                <li>
                    <a id='readjournal'>
                        <img id='eye' src='/NavBar/Eye.svg' />
                        Read Journal
                    </a>
                </li>
                <li>
                    <a id='emotions'>
                        <img id='heart' src='/NavBar/Heart.svg' />
                        Emotions
                    </a>
                </li>
                <li>
                    <a id='accountsettings' >
                        <img id='settings' src='/NavBar/Settings.svg' />
                        Account Settings
                    </a>
                </li>
            </ul>

            <a id='logout' className='logout'>
                Log Out
                <img id='logout-icon' src='/NavBar/Log out.svg' />
            </a>

        </nav>

    </>
}

export default NavBar
