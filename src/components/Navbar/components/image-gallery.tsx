'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface ImageGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
}

export default function ImageGallery({ isOpen, onClose, images }: ImageGalleryModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!isOpen) return null

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 w-full max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="relative">
          <img
            src={images[currentImageIndex]}
            alt={`Restaurant image ${currentImageIndex + 1}`}
            className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] object-cover rounded-lg"
          />
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
          >
            &#10094;
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
          >
            &#10095;
          </button>
        </div>
        <div className="mt-4 flex justify-center">
          <p className="text-gray-600">
            Image {currentImageIndex + 1} of {images.length}
          </p>
        </div>
      </div>
    </div>
  )
}