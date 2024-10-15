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
import ChatList from './components/Dating/components/chatList'
import Chat from './components/Dating/components/chat'
import MyProfile from './components/Navbar/components/Profile-sidebar/profile'
import PaymentMethods from './components/Navbar/components/Profile-sidebar/payment-methods'
import AddCard from './components/Navbar/components/Profile-sidebar/add-card'
import ContactUs from './components/Navbar/components/Profile-sidebar/contact-us'
import HelpPage from './components/Navbar/components/Profile-sidebar/help'
import Support from './components/Navbar/components/Profile-sidebar/support'
import HelpCenterPage from './components/Navbar/components/Profile-sidebar/help-center'
import Settings from './components/Navbar/components/Profile-sidebar/settings'
import AddressManager from './components/Navbar/components/Profile-sidebar/address-manager'

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
        <Route path="/restaurant/:id" element={<RestaurantView />} />
        <Route path="/dating/chats" element={<ChatList />} />
        <Route path="/dating/chat/:id" element={<Chat />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/help-&-faqs" element={<HelpPage />} />
        <Route path="/support" element={<Support />} />
        <Route path="/help-center" element={<HelpCenterPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/address-manager" element={<AddressManager />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/add-card" element={<AddCard />} />
      </Routes>
    </Router>
  )
}

export default App
