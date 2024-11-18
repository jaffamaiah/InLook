import React, { useMemo, useState } from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { createEditor } from 'slate'
import { useNavigate } from 'react-router-dom'

import { EmotionDropdown } from '../../components'
import { pages, axiosClient, errorHandler, ProtectedPage } from '../../utilities'
import './Write.css'


export default function Write() {

    const todaysDate = new Date()
    const navigate = useNavigate()
    const initialEntry = [{
        type: 'paragraph',
        children: [{ text: '' }]
    }]

    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const [entry, setEntry] = useState(initialEntry)
    const [title, setTitle] = useState('')
    const [emotion, setEmotion] = useState(null)

    function getEntryText() {
        let entryText = entry[0]['children'][0]['text']
        for (let i = 1; i < entry.length; i++) {
            entryText += '\n' + entry[i]['children'][0]['text']
        }
        return entryText
    }

    async function submitJournal() {
        const journalEntryText = getEntryText()
        if (title.length === 0)
            return alert('Title has been left blank!')
        if (journalEntryText.length === 0)
            return alert('Journal has been left blank!')

        try {
            let response = await axiosClient.post('http://localhost:8080/create-journal', {
                title: title,
                entry_text: journalEntryText,
                date_time: todaysDate.toISOString(),
                emotion: (!!emotion ? emotion : '') // empty string if emotion is null
            })
            navigate(pages.MyJournal.path + `/${response.data.id}`)
        } catch (error) {
            errorHandler(error)
        }
    }

    return <><ProtectedPage />

        <h1>{pages.Write.name}</h1>

        <h2>{
            todaysDate.toLocaleString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            })
        }</h2>

        <input className='title-textbox' type='title' value={title} onChange={(newTitle) => setTitle(newTitle.target.value)} placeholder='Enter a title' />

        <Slate editor={editor} initialValue={entry} onChange={(newEntryValue) => setEntry(newEntryValue)}>
            <Editable className='journal-textbox' placeholder='Today I am feeling...' />
        </Slate>

        <div className='emotion-dropdown'>
            <EmotionDropdown onOptionSelect={(emotion) => { setEmotion(emotion) }} />
        </div>

        <button className='submit-button' type='button' onClick={submitJournal} >Submit</button>
    </>
}
