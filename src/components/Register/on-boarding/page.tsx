import { useState } from 'react'

const onboardingData = [
  {
    title: "Discover Food",
    description: "Explore a wide variety of delicious cuisines from local restaurants.",
    icon: "🍽️",
    image: "src/assets/on-boarding/Pizza.jpg?height=200&width=400"
  },
  {
    title: "Easy Payment",
    description: "Securely pay for your meals with just a few taps.",
    icon: "💳",
    image: "src/assets/on-boarding/easyPayment.jpg?height=200&width=400"
  },
  {
    title: "Fast Delivery",
    description: "Get your food delivered quickly and efficiently to your doorstep.",
    icon: "🚚",
    image: "src/assets/on-boarding/delivery.jpg?height=200&width=400"
  },
  {
    title: "Find Your Love",
    description: "Discover your new favorite dishes and dining experiences.",
    icon: "❤️",
    image: "src/assets/on-boarding/love.jpg?height=200&width=400"
  }
]

export default function OnboardingCards() {
  const [currentCard, setCurrentCard] = useState(0)

  const handleNext = () => {
    setCurrentCard((prev) => (prev + 1) % onboardingData.length)
  }

  const handleSkip = () => {
    window.location.href = '/login'
  }

  const currentData = onboardingData[currentCard]

  return (
    <div className="flex items-center justify-center min-h-screen bg-snow py-8 px-4">
      <div className="relative bg-snow rounded-lg shadow-md w-full max-w-6xl h-[90vh] max-h-[800px] overflow-hidden flex flex-col justify-between drop-shadow-2xl">
        <img
          src={currentData.image}
          alt={currentData.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <button
          className="absolute top-4 right-4 sm:top-6 sm:right-6 px-4 py-2 sm:px-6 sm:py-3 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-colors text-base sm:text-lg z-20 hover:cursor-pointer"
          onClick={handleSkip}
        >
          Skip
        </button>
        <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-white text-center px-4 sm:px-8">
          <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">{currentData.icon}</div>
          <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">{currentData.title}</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl">{currentData.description}</p>
          {currentCard < onboardingData.length - 1 ? (
            <button
              className="px-8 py-2 sm:px-10 sm:py-3 bg-lila text-white rounded-full text-lg sm:text-xl hover:bg-opacity-90 transition-colors"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button
              className="px-8 py-2 sm:px-10 sm:py-3 bg-lila text-white rounded-full text-lg sm:text-xl hover:bg-opacity-90 transition-colors"
              onClick={handleSkip}
            >
              Get started
            </button>
          )}
        </div>
        <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center space-x-2 z-20">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-12 sm:w-16 rounded-full ${
                index === currentCard ? 'bg-lila' : 'bg-white bg-opacity-50'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}