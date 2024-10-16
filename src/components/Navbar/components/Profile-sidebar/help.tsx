import { useNavigate, Link } from 'react-router-dom'
import { ChevronLeft, HelpCircle, Book } from 'react-feather'

export default function HelpPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-vanilla flex justify-center items-center p-4">
      <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <header className="bg-lila p-4 flex items-center">
          <button 
            className="text-white hover:text-lila-light transition-colors" 
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex-grow text-center">How Can We Help?</h1>
        </header>
        
        <main className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <p className="text-center text-gray-600 text-base sm:text-lg md:text-xl">
            We're here to assist you. Choose an option below to get the help you need.
          </p>
          
          <Link
            to="/support"
            className="block w-full bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-lila-light"
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="bg-lila rounded-full p-2 sm:p-3">
                <HelpCircle size={20} className="text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-lg sm:text-xl text-lila">Help with an Order</h2>
                <p className="text-sm sm:text-base text-gray-600">Get support for your recent purchases</p>
              </div>
            </div>
          </Link>
          
          <Link
            to="/help-center"
            className="block w-full bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-lila-light"
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="bg-pink rounded-full p-2 sm:p-3">
                <Book size={20} className="text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-lg sm:text-xl text-pink">Help Center</h2>
                <p className="text-sm sm:text-base text-gray-600">Browse FAQs and general information</p>
              </div>
            </div>
          </Link>
          
          <div className="text-center">
            <button 
              onClick={() => navigate('/contact-us')} 
              className="text-lila hover:text-pink transition-colors font-medium text-sm sm:text-base"
            >
              Need more help? Contact us
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}