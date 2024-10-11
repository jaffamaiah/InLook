import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [data, setData ] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/people_endpoint")
    .then(
      (res) => {
        setData(res.data);
      }
    );
  }, []);

  return <div>{
    data.map((person) => {
      return <h1>{person.name + " " + person.id + " " + person.job}</h1>
    })
  }</div>;
}

export default App;
