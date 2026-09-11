import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [jokes, setJokes] = useState([])

  return (
    <>
    <h1>Full Stack Application</h1>
    <p>JOKES: {jokes.length}</p>

    {
      jokes.map((joke, index) => {
        <div key={joke.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      })
     }
    </>
  )
}

export default App
