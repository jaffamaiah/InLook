import { pages } from "../../utilities"
import './Home.css'

export default function Home() {
    return <>

        <img className='landing-background' src='/Home/HomeBackground.svg' alt='' />
        <div className='landing-section'>
            <img className='landing-logo' src='/NavBar/Logo.svg' alt='Logo' />
            <h1>
                a journaling platform <br />
                for blah blah blah blah
            </h1>
            <h2 className='landing-paragraph2'>
                This is smaller text about something less important than the thing above. Idk what to put here. I feel like there should be buttons under this to direct to other pages? but I think we have it set up for the user to use the nav bar and anywhere they need access will direct to login/ sign up so idk
            </h2>
            <nav className='landing-buttons'>
                <a href={pages.Emotions.path}>
                    Emotions
                </a>
                <a href={pages.LogIn.path}>
                    Log In
                </a>
            </nav>
        </div>
    </>
}
