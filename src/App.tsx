import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage/page'
import LoginPage from './components/Login/page'
import RegisterPage from './components/Register/page'
import HomePage from './components/HomePage/page'
import OnboardingCards from './components/Register/on-boarding/page'
import ForgotPasswordPage from './components/Login/forgot-password/page'
import Socials from './components/Socials/page'
import Profile from './components/Socials/components/profile'
import Dating from './components/Dating/page'
import Food from './components/Food/page'
import FoodDetails from './components/Food/components/foodDetails'
import Checkout from './components/Navbar/components/checkout'
import Payment from './components/Navbar/components/payment'
import OrderConfirmed from './components/Navbar/components/orderConfirmed'
import RestaurantView from './components/Navbar/components/restaurantView'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/on-boarding" element={<OnboardingCards />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/socials" element={<Socials />} />
        <Route path="/socials/user-profile" element={<Profile />} />
        <Route path="/dating" element={<Dating />} />
        <Route path="/food" element={<Food />} />
        <Route path="/food-details" element={<FoodDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-confirmed" element={<OrderConfirmed />} />
        <Route path="/restaurant" element={<RestaurantView />} />
      </Routes>
    </Router>
  )
}

export default App