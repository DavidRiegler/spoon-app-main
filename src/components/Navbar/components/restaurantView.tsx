'use client'

import { useState } from 'react'
import { ArrowLeft, Image as ImageIcon, X } from 'lucide-react'
import Navbar from '../page'
import RestaurantMenu from './restaurant-menu'
import { useNavigate } from 'react-router-dom'

export default function RestaurantView() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const navigate = useNavigate()

  const images = [
    "../src/assets/restaurants/piedmont-old-town-restaurant.png",
    "../src/assets/on-boarding/Pizza.jpg",
    "../src/assets/on-boarding/Pizza.jpg",
    "../src/assets/on-boarding/Pizza.jpg",
    "../src/assets/on-boarding/Pizza.jpg"
  ] 

  const openGallery = (index: number) => {
    setCurrentImageIndex(index)
    setIsGalleryOpen(true)
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className='min-h-screen bg-vanilla'>
      <div className="bg-vanilla mx-auto px-4 py-4 sm:py-6 max-w-7xl">
        <Navbar />

        <main className="max-w-7xl mx-auto bg-white rounded-b-xl p-4 sm:p-6">
          <div className='flex items-center justify-between mb-6 sm:mb-10'>
            <a className="text-lila hover:cursor-pointer" onClick={() => navigate(-1)}>
              <ArrowLeft size={24} />
            </a>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-lila">Luigi's Kitchen</h2>
            <div className="w-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 mb-4">
            <div className="row-span-1 sm:row-span-2">
              <img src={images[0]} alt="Restaurant front" className="w-full h-48 sm:h-full object-cover rounded-tl-custom sm:rounded-l-custom cursor-pointer" onClick={() => openGallery(0)} />
            </div>
            <div className="grid grid-cols-2 gap-2 ml-2">
              <img src={images[1]} alt="Interior" className="w-full h-24 sm:h-full object-cover cursor-pointer" onClick={() => openGallery(1)} />
              <img src={images[2]} alt="Pasta" className="w-full h-24 sm:h-full object-cover cursor-pointer rounded-tr-custom" onClick={() => openGallery(2)} />
              <img src={images[3]} alt="Pizza" className="w-full h-24 sm:h-full object-cover cursor-pointer" onClick={() => openGallery(3)} />
              <div className="relative group">
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-br-custom cursor-pointer transition-opacity group-hover:bg-opacity-75" onClick={() => openGallery(4)}>
                  <ImageIcon className="text-white" size={24} />
                  <span className="text-white text-xs sm:text-sm font-medium ml-2">See More</span>
                </div>
                <img src={images[4]} alt="More pictures" className="w-full h-24 sm:h-full rounded-br-custom object-cover" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
                <RestaurantMenu />
            </div>

            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-inner h-fit">
                <h3 className="text-xl sm:text-2xl font-semibold text-lila mb-4">Restaurant Information</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-3">Open daily from 11:00 AM to 10:00 PM</p>
                <p className="text-sm sm:text-base text-gray-700 mb-3">50 Guests - 15 Tables - 2 Restaurants</p>
                <p className="text-sm sm:text-base text-gray-700 mb-6">Address: 123 Via Roma, Rome, Italy</p>
                <button className="w-full bg-burnt text-white py-2 sm:py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base">
                    Reserve a Table
                </button>
            </div>
          </div>

          {isGalleryOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="relative max-w-4xl w-full">
                <img src={images[currentImageIndex]} alt={`Gallery image ${currentImageIndex + 1}`} className="w-full h-auto" />
                <button onClick={prevImage} className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 sm:p-2 hover:bg-opacity-75">
                  <ArrowLeft size={20} />
                </button>
                <button onClick={nextImage} className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 sm:p-2 hover:bg-opacity-75">
                  <ArrowLeft size={20} className="transform rotate-180" />
                </button>
                <button onClick={closeGallery} className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white bg-opacity-50 rounded-full p-1 sm:p-2 hover:bg-opacity-75">
                  <X size={20} />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
