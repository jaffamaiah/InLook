import React, { useState } from 'react'

import './NavBar.css'
import { pages } from '../../utilities'


export default function NavBar() {

    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    return <div>

        <div className={`sidebar-defocus-area ${isOpen ? 'open' : ''}`} onClick={toggleSidebar} />

        <nav className='navbar'>
            <div className='navbar-left'>
                <img src='/hamburger-menu.png' alt='Logo' className='toggle-button' onClick={toggleSidebar} />
                {/* 
                Icon by HideMaru
                'https://www.freepik.com/icon/settings_13895453#fromView=search&page=1&position=5&uuid=47877187-26c6-4a38-bee1-2f315e7ef351'
                */}
            </div>
            <div className='navbar-center'>
                <a href='/' className='logo'>InLook</a>
            </div>
            <div className='navbar-right' />
        </nav>

        <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
            <ul className='nav-links'>{
                Object.entries(pages).map(([pageName, pageData]) => (
                    pageData.sidebar ?
                        <li key={pageName}>
                            <a href={pageData.path}>{pageData.name}</a>
                        </li>
                        :
                        <></>
                ))
            }</ul>
        </nav>

    </div>
}
