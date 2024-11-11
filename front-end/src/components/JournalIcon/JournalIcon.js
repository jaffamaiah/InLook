import { useNavigate } from 'react-router-dom'

import './JournalIcon.css'



export default function JournalIcon(args) {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(args.path)
    }

    return (
        <div className='journal-icon' onClick={() => handleClick()}>
            <h3>{args.date}</h3>
            <h3>{args.title}</h3>
        </div >
    )
}
