import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

// Components
import Home from './components/Home'
import ClassesIndex from './components/cali/ClassesIndex'
import PageNavbar from './components/common/PageNavbar'
import PageNotFound from './components/common/PageNotFound'
import Profile from './components/profile/Profile'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

const App = () => {
  return (
    <div className='site-wrapper'>
      <BrowserRouter>
        <PageNavbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<ClassesIndex />} />
          <Route path="/profile/:profileId" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* The below route is rendered if nothing else matches */}
          {/* This is best used on a 404 page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>






      </BrowserRouter>
    </div>
  )
}


// const App = () => {
//   useEffect(() => {
//     const getData = async () => {
//       const { data } = await axios.get('/api/cali/') // * <-- replace with your endpoint
//       console.log(data)
//     }
//     getData()
//   })

//   return <h1>Hello World</h1>
// }

// export default App
