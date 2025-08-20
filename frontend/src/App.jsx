import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import UserProvider from './context/UserContext.jsx'
import DashBoard from './pages/DashBoard.jsx'
import EditResume from './components/EditResume.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserProvider>
       <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/dashboard' element={<DashBoard />} />
      <Route path='/resume/:resumeId' element={<EditResume />} />
    </Routes>

    <Toaster
    toastOptions={{
      className:"",
      style:{
        fontSize:"13px"
      }
    }}    
    ></Toaster>
    </UserProvider>
   
  )
}

export default App
