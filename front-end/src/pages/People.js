import React, { useState, useEffect } from "react"
import axios from "axios"

function People() {

    // Declare variable `fetchedData` and `setData()` as the function to modify it
    const [fetchedData, setData ] = useState([])

    // Fetch data from the API using axios.get(), store the result in data
    useEffect(() => {
    axios.get("http://localhost:5000/people")
        .then(
            (result) => { setData(result.data) }
        )
    }, [])

    return <div>{
        // Return an html element for each element in the fetchedData
        fetchedData.map((person) => {
          return <h1>{person.name + " " + person.id + " " + person.job}</h1>
        })
      }</div>
  };
  
  export default People
  