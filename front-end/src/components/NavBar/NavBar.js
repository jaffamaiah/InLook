import React, { useState } from 'react'

import './NavBar.css'
import { pages } from '../../utilities'
import LogOutButton from '../LogOutButton/LogOutButton'


export default function NavBar() {

    const [isOpen, setIsOpen] = useState(false)

    function toggleSidebar() {
        setIsOpen(!isOpen)
    }

    return <>
        <div id='topbar' className='topbar'>
            <img className='hamburger-menu' src='/NavBar/Hamburger_Menu.svg' alt='' onClick={toggleSidebar} />
            <a href={pages.Home.path}>
                <img className='logo' src='/NavBar/Logo.svg' alt='InLook Home' />
            </a>
            <div className='spacer' />
            <div className='topbar-logout'>
                <LogOutButton />
            </div>
        </div>

        <nav id='sidebar' className={`sidebar ${isOpen ? 'open' : ''}`}>

            <img id='x' className='x' src='/NavBar/X.svg' alt='Close Navbar' onClick={toggleSidebar} />

            <a href={pages.Profile.path} className='profile-section'>
                <img src='/NavBar/Account_Circle.svg' alt='' />
                <div>{pages.Profile.name}</div>
            </a>

            <div className='spacer' />

            <ul className='nav-links'>
                <li>
                    <a id='my-journal' href={pages.MyJournal.path}>
                        <img id='edit' src='/NavBar/Edit.svg' alt='' />
                        {pages.MyJournal.name}
                    </a>
                </li>
                <li>
                    <a id='emotions' href={pages.Emotions.path}>
                        <img id='heart' src='/NavBar/Heart.svg' alt='' />
                        {pages.Emotions.name}
                    </a>
                </li>
                <li>
                    <a id='account-settings' href={pages.Account.path}>
                        <img id='settings' src='/NavBar/Settings.svg' alt='' />
                        {pages.Account.name}
                    </a>
                </li>
            </ul>

            <div className='spacer' />

            <div className='sidebar-logout'>
                <LogOutButton />
            </div>

        </nav>

    </>
}
