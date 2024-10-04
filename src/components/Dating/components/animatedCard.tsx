import { motion } from 'framer-motion'

interface User {
  id: string
  name: string
  age: number
  bio: string
  image: string
}

interface AnimatedCardProps {
  user: User
  direction: 'left' | 'right' | 'up' | null
  onSwipe: (direction: 'left' | 'right' | 'up') => void
}

export default function AnimatedCard({ user, direction, onSwipe }: AnimatedCardProps) {
  const variants = {
    enter: { x: 0, y: 0, opacity: 1 },
    center: { x: 0, y: 0, opacity: 1 },
    exit: (direction: 'left' | 'right' | 'up') => {
      switch (direction) {
        case 'left':
          return { x: -300, opacity: 0 }
        case 'right':
          return { x: 300, opacity: 0 }
        case 'up':
          return { y: -300, opacity: 0 }
        default:
          return { opacity: 0 }
      }
    },
  }

  return (
    <motion.div
      className="absolute w-full h-full bg-white shadow-lg rounded-lg overflow-hidden"
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      custom={direction}
      transition={{ duration: 0.5 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = swipePower(offset.x, velocity.x)
        if (swipe < -swipeConfidenceThreshold) {
          onSwipe('left')
        } else if (swipe > swipeConfidenceThreshold) {
          onSwipe('right')
        } else if (offset.y < -swipeConfidenceThreshold) {
          onSwipe('up')
        }
      }}
    >
      <img
        src={user.image}
        alt={user.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
        <h2 className="text-2xl font-semibold">{user.name}, {user.age}</h2>
        <p className="mt-2">{user.bio}</p>
      </div>
    </motion.div>
  )
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}