import React, { useEffect, useState } from 'react'
import axios from 'axios'


const JournalView = () => {

    const [fetchedData, setData ] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/get-all-journals")
            .then(
                (journals) => { setData(journals.data) }
            )
            .catch(
                () => { setData("") }
            )
        }, [])

    return <div>
        <h1>Journal View</h1>
        {
            /*if*/ fetchedData === "" ?
            <h1>No Journals Found</h1>
            /*else*/:
                fetchedData.map((journal) => {
                    return <h1>{"TITLE: '" + journal.title + "' TEXT: '" + journal.entry_text + "'"}</h1>
                })
        }
    </div>
}


export default JournalView
