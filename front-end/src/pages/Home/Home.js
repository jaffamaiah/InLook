import { pages } from "../../utilities"
import './Home.css'

export default function Home() {
    return <>

        <img className='landing-background' src='/Home/HomeBackground.svg' alt='' />
        <div className='landing-section'>
            <img className='landing-logo' src='/NavBar/Logo.svg' alt='Logo' />
            <h1>
                Journaling made simple,<br />
                growth made possible.
            </h1>
            <h2 className='landing-paragraph2'>
            Discover the power of journalling with InLook - a web app designed to make journaling convenient and accessible from your computer. Whether you're jotting down thoughts, exploring your emotions, or taking a moment for yourself, InLook offers a seamless experience to support your well-being. Your journey to clarity and growth begins here - Take an InLook today.
            </h2>
            <nav className='landing-buttons'>
                <a href={pages.LogIn.path}>
                    Log In
                </a>
            </nav>
        </div>
    </>
}
