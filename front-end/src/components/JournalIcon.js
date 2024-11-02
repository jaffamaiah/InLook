import { useNavigate } from "react-router-dom"

import "./JournalIcon.css"



const JournalIcon = (args) => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/view-journals/${args.id}`)
  }

  return (
    <div className="journal-icon" onClick={() => handleClick()}>
      <h3>{args.date}</h3>
      <h3>{args.title}</h3>
    </div >
  )
}

export default JournalIcon
