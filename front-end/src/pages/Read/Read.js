import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Slate, Editable } from 'slate-react'
import { createEditor } from 'slate'

import { axiosClient, pages } from '../../utilities'


export default function Read() {
    const { id } = useParams()

    const [journalData, setJournalData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                let response = await axiosClient.get(`http://localhost:8080/journal/${id}`)
                let slateEntry = []
                response.data['entry_text'].split('\n').forEach((line) => {
                    slateEntry.push({
                        type: 'paragraph',
                        children: [{ text: line }],
                    })
                })
                setJournalData({
                    'title': response.data.title,
                    'date': response.data.date,
                    'entry': slateEntry
                })
            } catch {
                setError(`No Journal with ID ${id} found`)
            }
        }
        fetchData()
    }, [id])

    return <div>
        <h1>{pages.Read.name}</h1>
        {error && <h2>{error}</h2>}
        {journalData && <div>
            <h2>{`Title: ${journalData.title}`}</h2>
            <h2>{`Date: ${journalData.date}`}</h2>
            <Slate editor={createEditor()} initialValue={journalData.entry}>
                <Editable readOnly />
            </Slate>
        </div>}
    </div>
}
