import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Slate, Editable } from 'slate-react';
import { createEditor } from 'slate';

const JournalView = () => {
    const { id } = useParams();

    const [journalData, setJournalData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:8080/journal/${id}`)
            .then((response) => {
                let slateEntry = []
                response.data["entry_text"].split("\n").forEach((line) => {
                    slateEntry.push(
                        {
                            type: 'paragraph',
                            children: [{ text: line }],
                        }
                    )
                })
                setJournalData(
                    {
                        "title": response.data.title,
                        "date": response.data.date,
                        "entry": slateEntry
                    }
                )
            })
            .catch((error) => {
                if (error["status"] === 404) {
                    setError(`Error: Journal with ID ${id} not found!`)
                } else {
                    console.log(error)
                    setError(`Error: check console!`)
                }
            })
    }, [id])

    return <div>
        <h1>Journal View</h1>
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


export default JournalView
