import React, { useMemo, useState } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { createEditor } from 'slate';
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import "./JournalWrite.css"

const initialEntry = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
    }
]

const todaysDate = new Date()

const JournalWrite = () => {

    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const [entry, setEntry] = useState(initialEntry)
    const [title, setTitle] = useState('')

    const navigate = useNavigate()

    function getEntryText() {
        let entryText = entry[0]["children"][0]["text"]
        for (let i = 1; i < entry.length; i++) {
            entryText += "\n" + entry[i]["children"][0]["text"]
        }
        return entryText
    }

    const submitJournal = () => {
        const journalEntryText = getEntryText()
        if (title.length === 0)
            return alert("Title has been left blank!")
        if (journalEntryText.length === 0)
            return alert("Journal has been left blank!")
        axios.post('http://localhost:8080/create-journal', {
            title: title,
            entry_text: journalEntryText,
            date_time: todaysDate.toISOString()
        })
            .then(function (response) {
                navigate(`/view-journals/${response.data.id}`)
            })
            .catch(function (error) {
                console.log(error)
                alert("Invalid journal")
            })
    }

    return (<div>
        <h1>Journal</h1>
        <h2>{
            todaysDate.toLocaleString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            })
        }</h2>
        <input type="title" value={title} onChange={(newTitle) => setTitle(newTitle.target.value)} className="title-textbox" placeholder="Enter a title" />
        <Slate editor={editor} initialValue={entry} onChange={newEntryValue => setEntry(newEntryValue)}>
            <Editable className="journal-textbox" placeholder="Today I am feeling..." />
        </Slate>
        <button type="button" className="submit-button" onClick={submitJournal} >Submit</button>
    </div>)
}


export default JournalWrite
