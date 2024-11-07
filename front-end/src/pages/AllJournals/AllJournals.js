import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { JournalIcon } from '../../components'
import { pages } from '../../utilities'
import './AllJournals.css'


const AllJournals = () => {
    const [journalEntries, setjournalEntries] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:8080/get-all-journals')
            .then((response) => {
                setjournalEntries(response.data)
            })
            .catch((error) => {
                setError('Journals not found!')
                console.log(error)
            })
    }, [])

    return <div>
        <h1>All Journals</h1>
        {error && <h2>{error}</h2>}
        {journalEntries && (
            <div className='journal-grid'>{
                journalEntries.map(journal => (
                    <JournalIcon
                        path={pages.AllJournals.path + `/${journal.id}`}
                        title={journal.title}
                        date={journal.date}
                    />
                ))
            }</div>
        )}
    </div>
}


export default AllJournals
