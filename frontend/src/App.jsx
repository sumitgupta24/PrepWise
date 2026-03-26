import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import InterviewPage from './pages/InterviewPage'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { setUserData } from './redux/userSlice'
import InterviewHistory from './pages/InterviewHistory'
import Pricing from './pages/Pricing'
import InterviewReport from './pages/InterviewReport'

export const ServerURL = "http://localhost:8000"

function App() {
  const dispatch = useDispatch()
  const [authLoading, setAuthLoading] = useState(true)
  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(ServerURL + "/api/user/current-user", { withCredentials: true })
        dispatch(setUserData(result.data))
        console.log(result.data)
      } catch (error) {
        console.log(error)
        dispatch(setUserData(null))
      } finally {
        setAuthLoading(false) // ✅ done loading either way
      }
    }
    getUser()
  }, [dispatch])

  if (authLoading) return (
    <div className='min-h-screen flex items-center justify-center'>
      <p className='text-gray-400'>Loading...</p>
    </div>
  )
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/interview' element={<InterviewPage />} />
      <Route path='/history' element={<InterviewHistory />} />
      <Route path='/pricing' element={<Pricing />} />
      <Route path='/report/:id' element={<InterviewReport />} />

    </Routes>
  )
}

export default App