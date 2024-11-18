import React, { useEffect, useState } from 'react'

import { JournalIcon, NewIcon } from '../../components'
import { pages, axiosClient, ProtectedPage } from '../../utilities'
import './MyJournal.css'


export default function MyJournal() {
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


    return <><ProtectedPage />

        <h1>{pages.MyJournal.name}</h1>

        {error && <h2>{error}</h2>}

        {journalEntries && (
            <nav className='journal-grid'>
                <NewIcon />
                {journalEntries.toReversed().map(journal => (
                    <JournalIcon
                    path={pages.MyJournal.path + `/${journal.id}`}
                    title={journal.title}
                    date={journal.date}
                    emotion={journal.emotion}
                    />
                ))}
            </nav>
        )}
    </>
}
