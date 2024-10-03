import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage/page'
import LoginPage from './components/Login/page'
import RegisterPage from './components/Register/page'
import HomePage from './components/HomePage/page'
import Overview from './components/HomePage/components/BestSellers/overview'
import OnboardingCards from './components/Register/on-boarding/page'
import ForgotPasswordPage from './components/Login/forgot-password/page'
import Socials from './components/Socials/page'
import Profile from './components/Socials/components/profile'
import Dating from './components/Dating/page'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/on-boarding" element={<OnboardingCards />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/socials" element={<Socials />} />
        <Route path="/socials/user-profile" element={<Profile />} />
        <Route path="/dating" element={<Dating />} />
      </Routes>
    </Router>
  )
}

export default App