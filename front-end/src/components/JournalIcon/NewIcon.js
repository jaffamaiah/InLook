import { useNavigate } from 'react-router-dom'

import { pages } from '../../utilities'
import './JournalIcon.css'


export default function NewIcon() {
    const navigate = useNavigate()
    return <div className='new-icon' onClick={() => navigate(pages.Write.path)} >
        +
    </div>
}