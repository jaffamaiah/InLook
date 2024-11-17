import { useNavigate } from 'react-router-dom'

import './JournalIcon.css'


export default function JournalIcon(args) {
    const navigate = useNavigate()

    return (
        <div className='journal-icon' onClick={() => navigate(args.path)}>
            <h3>{args.date}</h3>
            <h3>{args.title}</h3>
            <h3>{args.emotion}</h3>
        </div >
    )
}
