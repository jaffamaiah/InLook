import React, { useState } from 'react'

import './NavBar.css'
import { pages } from '../../utilities'

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false)

    function toggleSidebar() {
        setIsOpen(!isOpen)
    }

    function logOut() {/* TODO */}

    return <>

        <div id='topbar' className='topbar'>
            <img id='hamburger-menu' src='/NavBar/Hamburger_Menu.svg' alt='' onClick={toggleSidebar} />
            <a href={pages.Home.path}>
                <img id='logo' src='/NavBar/Logo.svg' alt='' />
            </a>
            <img id='logout' src='/NavBar/Log_Out.svg' alt='' />
        </div>

        <nav id='sidebar' className={`sidebar ${isOpen ? 'open' : ''}`}>
            <img id='x' className='x' src='/NavBar/X.svg' alt='close' onClick={toggleSidebar} />

            <div className='profile-section'>
                <img id='account-circle' src='/NavBar/Account_Circle.svg' alt='' />
                <a href={pages.Profile.path}>{pages.Profile.name}</a>
            </div>

            <ul className='nav-links'>
                <li>
                    <a id='writejournal' href={pages.JournalWrite.path}>
                        <img id='edit' src='/NavBar/Edit.svg' alt='' />
                        {pages.JournalWrite.name}
                    </a>
                </li>
                <li>
                    <a id='readjournal' href={pages.AllJournals.path}>
                        <img id='eye' src='/NavBar/Eye.svg' alt='' />
                        Read Journal
                    </a>
                </li>
                <li>
                    <a id='emotions' href={pages.Emotions.path}>
                        <img id='heart' src='/NavBar/Heart.svg' alt='' />
                        Emotions
                    </a>
                </li>
                <li>
                    <a id='accountsettings' href={pages.AccountSettings.path}>
                        <img id='settings' src='/NavBar/Settings.svg' alt='' />
                        Account Settings
                    </a>
                </li>
            </ul>

            <div id='logout' className='logout' href={pages.Home.path}>
                Log Out
                <img id='logout-icon' src='/NavBar/Log_Out.svg' alt='' />
            </div>
        </nav>
    </>
}

export default NavBar
