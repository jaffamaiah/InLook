import React, { useEffect, useState } from 'react'

import { JournalIcon, NewIcon } from '../../components'
import { pages, axiosClient, ProtectedPage } from '../../utilities'
import './MyJournal.css'


export default function MyJournal() {
    const [journalEntries, setjournalEntries] = useState(null)
    const [error, setError] = useState(null)

    async function getAllJournals() {
        try {
            let response = await axiosClient.get('http://localhost:8080/get-all-journals')
            setjournalEntries(response.data)
            setError(null)
        } catch {
            setjournalEntries(null)
            setError("No Journals to display")
        }
    }

    async function getSearchResults(keyword) {
        const params = { 'keyword': keyword }
        try {
            let response = await axiosClient.get('http://localhost:8080/title-search', { params })
            setjournalEntries(response.data)
            setError(null)
        } catch {
            setError("No Journals match your search")
            setjournalEntries(null)
        }
    }

    function handleSearch(keyword) {
        if (keyword) {
            getSearchResults(keyword)
        } else {
            getAllJournals()
        }
    }


    useEffect(() => {
        getAllJournals()
    }, [])

    return <div className='gradient-background'>

        <nav className='search-section'>
            <h1>{pages.MyJournal.name}</h1>
            <div className='journal-search-bar'>
                <h2>Search Title</h2>
                <input onChange={(e) => handleSearch(e.target.value)} />
            </div>
        </nav>

        <nav className='journal-section'>
            <nav className='journal-grid'>
                <NewIcon />
                {error && <h2>{error}</h2>}
                {journalEntries && <>
                    {journalEntries.toReversed().map(journal => (
                        <JournalIcon
                            path={pages.MyJournal.path + `/${journal.id}`}
                            title={journal.title}
                            date={journal.date}
                            emotion={journal.emotion}
                        />
                    ))}
                </>}
            </nav>
        </nav>

        <ProtectedPage />
    </div>
}
