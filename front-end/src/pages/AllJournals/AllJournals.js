import React, { useEffect, useState } from 'react'

import { JournalIcon } from '../../components'
import { pages, axiosClient, errorHandler } from '../../utilities'
import './AllJournals.css'


export default function AllJournals() {
    const [journalEntries, setjournalEntries] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                let response = await axiosClient.get('http://localhost:8080/get-all-journals')
                setjournalEntries(response.data)
            } catch {
                setError("No Journals to display")
            }
        }
        fetchData()
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
