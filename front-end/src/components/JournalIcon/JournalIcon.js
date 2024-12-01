import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import './JournalIcon.css'
import { emotions } from '../../utilities'


export default function JournalIcon(args) {
    const navigate = useNavigate()
    const [color, setColor] = useState('var(--offwhite)')

    useEffect(() => {
        if (emotions[args.emotion]) {
            setColor(emotions[args.emotion].color)
        }
    }, [args])

    return <div className='journal-icon' style={{ backgroundColor: color }} onClick={() => navigate(args.path)}>
        <h3>{args.date}</h3>
        <h3>{args.title}</h3>
        <h3>{args.emotion}</h3>
    </div>
}
