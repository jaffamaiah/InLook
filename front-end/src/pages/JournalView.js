import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Slate, Editable } from 'slate-react';
import { createEditor } from 'slate';

const JournalView = () => {
    const { id } = useParams();

    const [fetchedData, setData] = useState([])
    let journalComponent
    let slateEntry

    // Fetch journals
    useEffect(() => {
        axios.get("http://localhost:8080/journal/" + id)
            .then(
                (journals) => { setData(journals.data) }
            )
            .catch(
                () => { setData("") }
            )
    }, [])

    // Create journalComponent
    if (fetchedData.length === 0) { // error when fetching data
        journalComponent = <h1>{"Journal with id " + id + " not found!"}</h1>
    } else {
        console.log(fetchedData)
        slateEntry = []
        
        fetchedData["entry_text"].split("\n").forEach((line) => {
            slateEntry.push(
                {
                    type: 'paragraph',
                    children: [{ text: line }],
                }
            )
        })
        journalComponent = <div>
            <h2>{fetchedData.title}</h2>
            <Slate editor={createEditor()} initialValue={slateEntry} onChange={() => { }}>
                <Editable readOnly />
            </Slate>
        </div>
    }

    return <div>
        <h1>Journal View</h1>
        {journalComponent}
    </div>
}


export default JournalView
