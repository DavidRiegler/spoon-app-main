import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage/page'
import LoginPage from './components/Login/page'
import RegisterPage from './components/Register/page'
import HomePage from './components/HomePage/page'
import Overview from './components/HomepageComponents/BestSellers/overview'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/overview" element={<Overview />} />
      </Routes>
    </Router>
  )
}

export default App