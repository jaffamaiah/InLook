import React, { useMemo, useState } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { createEditor } from 'slate';
import axios from 'axios'

import "./JournalEntry.css"

const initialEntry = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
    }
]

const todaysDate = new Date()

const JournalEntry = () => {

    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const [entry, setEntry] = useState(initialEntry)
    const [title, setTitle] = useState('')

    function getEntryText() { return entry[0]["children"][0]["text"] }

    const submitJournal = () => {
        const journalEntryText = getEntryText()
        if (title.length === 0)
            return alert("Title has been left blank!")
        if (journalEntryText.length === 0)
            return alert("Journal has been left blank!")
        axios.post('http://localhost:8080/journals', {
            title: title,
            entry_text: journalEntryText,
            date_time: todaysDate.toISOString()
        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error, 'error')
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


export default JournalEntry
