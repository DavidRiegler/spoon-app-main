import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronDown } from 'react-feather'

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <details className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
      <summary 
        className="font-semibold cursor-pointer text-lila flex justify-between items-center text-sm sm:text-base"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        {question}
        <ChevronDown className={`text-lila transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </summary>
      {isOpen && <p className="mt-2 text-gray-600 text-sm sm:text-base">{answer}</p>}
    </details>
  );
};

export default function HelpCenterPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex justify-center items-center bg-vanilla p-4">
      <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-lg overflow-hidden">
        <header className="bg-vanilla p-4 flex items-center">
          <button className="text-lila" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-lila flex-grow text-center">Help Center</h1>
        </header>
        
        <main className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-lila text-center mb-4 sm:mb-6">How Can We Help You?</h2>
          
          <div className="flex justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
            <button className="px-4 sm:px-6 py-2 bg-lila text-white rounded-full text-sm sm:text-base">FAQ</button>
            <button className="px-4 sm:px-6 py-2 bg-pink text-white rounded-full text-sm sm:text-base">Contact Us</button>
          </div>
          
          <div className="flex justify-between space-x-2 mb-4 sm:mb-6">
            <button className="bg-lila text-white w-full py-2 rounded-full text-xs sm:text-sm">General</button>
            <button className="bg-pink text-white w-full py-2 rounded-full text-xs sm:text-sm">Account</button>
            <button className="bg-pink text-white w-full py-2 rounded-full text-xs sm:text-sm">Services</button>
          </div>
          
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 rounded-lg border border-lila-light focus:outline-none focus:ring-2 focus:ring-lila mb-4 sm:mb-6 text-sm sm:text-base"
          />
          
          <div className="space-y-3 sm:space-y-4">
            <FAQItem 
              question="Lorem ipsum dolor sit amet?" 
              answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam."
            />
            <FAQItem 
              question="Consectetur adipiscing elit?" 
              answer="Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam."
            />
            <FAQItem 
              question="Proin ac diam quam?" 
              answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in sagittis magna, ut feugiat diam."
            />
          </div>
        </main>
      </div>
    </div>
  )
}