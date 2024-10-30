import React, { useEffect, useState } from 'react'
import axios from 'axios'


const JournalView = () => {

    const [fetchedData, setData ] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/write_journal")
            .then(
                (journals) => { setData(journals.data) }
            )
        }, [])

    return <div>
        <h1>Journal View</h1>
        {
            // Return an html element for each element in the fetchedData
            fetchedData.map((journal) => {
                return <h1>{"TITLE: '" + journal.title + "' TEXT: '" + journal.entry_text + "'"}</h1>
            })
        }
    </div>
}


export default JournalView
