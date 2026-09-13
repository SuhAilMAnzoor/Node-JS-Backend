import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

// fetch, axios, react-query what are the requiremnt first you have to understand
// in this we use axios to fetch data from backend server and display it in frontend
// this library is used to make HTTP requests from the browser and Node.js. It provides a simple and easy-to-use API for sending asynchronous HTTP requests to REST endpoints and performing CRUD operations.

function App() {
  const [jokes, setJokes] = useState([])


  useEffect(() => {
    axios.get('/api/jokes')
      .then((response) => {
        setJokes(response.data)
  }
  ).catch((error) => {
    console.log(error)
  })
})
  return (
    <>
    <h1>Full Stack Application</h1>
    <p>JOKES: {jokes.length}</p>

    {
      jokes.map((joke, index) => (
        <div key={joke.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      ))
     }
    </>
  )
}

export default App
