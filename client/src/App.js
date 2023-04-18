import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

// Components
import Home from './components/Home'






const App = () => {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/cali/') // * <-- replace with your endpoint
      console.log(data)
    }
    getData()
  })

  return <h1>Hello World</h1>
}

export default App
