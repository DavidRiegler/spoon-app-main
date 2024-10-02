'use client'

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Navigation } from "./components/navigation"
import { Trends } from "./components/trends"
import { TweetForm } from "./components/tweet-form"
import { TweetCard } from "./components/tweet-card"
import { Login } from "./components/login"
import { Register } from "./components/register"

interface Comment {
  id: number
  content: string
  username: string
  likes: string[]
}

interface Tweet {
  id: number
  content: string
  username: string
  comments: Comment[]
  likes: string[]
  retweets: string[]
}

const exampleTweets: Tweet[] = [
  {
    id: 1,
    content: "Just launched my new website! Check it out at https://example.com 🚀",
    username: "TechGuru",
    comments: [
      { id: 1, content: "Looks great! Congrats!", username: "WebDev101", likes: ["Coder123"] },
      { id: 2, content: "Nice work! How long did it take you?", username: "CuriousCat", likes: [] }
    ],
    likes: ["WebDev101", "DesignPro"],
    retweets: ["Coder123"]
  },
  {
    id: 2,
    content: "Just finished reading 'The Pragmatic Programmer'. Highly recommend it to all developers!",
    username: "BookwormDev",
    comments: [
      { id: 1, content: "One of my favorites too!", username: "CodeMaster", likes: ["BookwormDev"] }
    ],
    likes: ["CodeMaster", "TechGuru"],
    retweets: []
  },
  {
    id: 3,
    content: "Who's excited for the new JavaScript features coming this year? 🎉",
    username: "JSEnthusiast",
    comments: [],
    likes: ["WebDev101", "Coder123", "TechGuru"],
    retweets: ["DesignPro"]
  }
]

export default function Socials() {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [user, setUser] = useState<string | null>(null)
  const [showLogin, setShowLogin] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    const storedTweets = localStorage.getItem('tweets')
    if (storedTweets) {
      const parsedTweets = JSON.parse(storedTweets)
      if (parsedTweets.length > 0) {
        setTweets(parsedTweets)
      } else {
        setTweets(exampleTweets)
        localStorage.setItem('tweets', JSON.stringify(exampleTweets))
      }
    } else {
      setTweets(exampleTweets)
      localStorage.setItem('tweets', JSON.stringify(exampleTweets))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tweets', JSON.stringify(tweets))
  }, [tweets])

  const handleAddTweet = (content: string) => {
    if (!user) return
    const newTweet: Tweet = {
      id: tweets.length + 1,
      content,
      username: user,
      comments: [],
      likes: [],
      retweets: [],
    }
    const updatedTweets = [newTweet, ...tweets]
    setTweets(updatedTweets)
    localStorage.setItem('tweets', JSON.stringify(updatedTweets))
  }

  const handleAddComment = (tweetId: number, content: string) => {
    if (!user) return
    const updatedTweets = tweets.map((tweet) => {
      if (tweet.id === tweetId) {
        return {
          ...tweet,
          comments: [
            ...tweet.comments,
            { id: tweet.comments.length + 1, content, username: user, likes: [] },
          ],
        }
      }
      return tweet
    })
    setTweets(updatedTweets)
    localStorage.setItem('tweets', JSON.stringify(updatedTweets))
  }

  const handleLike = (tweetId: number) => {
    if (!user) return
    const updatedTweets = tweets.map((tweet) => {
      if (tweet.id === tweetId) {
        const isLiked = tweet.likes.includes(user)
        return {
          ...tweet,
          likes: isLiked
            ? tweet.likes.filter((username) => username !== user)
            : [...tweet.likes, user],
        }
      }
      return tweet
    })
    setTweets(updatedTweets)
    localStorage.setItem('tweets', JSON.stringify(updatedTweets))
  }

  const handleRetweet = (tweetId: number) => {
    if (!user) return
    const updatedTweets = tweets.map((tweet) => {
      if (tweet.id === tweetId) {
        const isRetweeted = tweet.retweets.includes(user)
        return {
          ...tweet,
          retweets: isRetweeted
            ? tweet.retweets.filter((username) => username !== user)
            : [...tweet.retweets, user],
        }
      }
      return tweet
    })
    setTweets(updatedTweets)
    localStorage.setItem('tweets', JSON.stringify(updatedTweets))
  }

  const handleDeleteComment = (tweetId: number, commentId: number) => {
    const updatedTweets = tweets.map((tweet) => {
      if (tweet.id === tweetId) {
        return {
          ...tweet,
          comments: tweet.comments.filter((comment) => comment.id !== commentId),
        }
      }
      return tweet
    })
    setTweets(updatedTweets)
    localStorage.setItem('tweets', JSON.stringify(updatedTweets))
  }

  const handleLikeComment = (tweetId: number, commentId: number) => {
    if (!user) return
    const updatedTweets = tweets.map((tweet) => {
      if (tweet.id === tweetId) {
        return {
          ...tweet,
          comments: tweet.comments.map((comment) => {
            if (comment.id === commentId) {
              const isLiked = comment.likes.includes(user)
              return {
                ...comment,
                likes: isLiked
                  ? comment.likes.filter((username) => username !== user)
                  : [...comment.likes, user],
              }
            }
            return comment
          }),
        }
      }
      return tweet
    })
    setTweets(updatedTweets)
    localStorage.setItem('tweets', JSON.stringify(updatedTweets))
  }

  const handleLogin = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((u: any) => u.email === email && u.password === password)
    if (user) {
      setUser(user.username)
      localStorage.setItem('user', JSON.stringify(user.username))
    } else {
      alert('Invalid credentials')
    }
  }

  const handleRegister = (username: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.some((u: any) => u.email === email || u.username === username)) {
      alert('User already exists')
      return
    }
    const newUser = { username, email, password }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    setUser(username)
    localStorage.setItem('user', JSON.stringify(username))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) {
    return (
      <div className="container mx-auto mt-8">
        {showLogin ? (
          <>
            <Login onLogin={handleLogin} />
            <p className="text-center mt-4">
              Don't have an account?{" "}
              <button className="text-blue-500" onClick={() => setShowLogin(false)}>
                Register
              </button>
            </p>
          </>
        ) : (
          <>
            <Register onRegister={handleRegister} />
            <p className="text-center mt-4">
              Already have an account?{" "}
              <button className="text-blue-500" onClick={() => setShowLogin(true)}>
                Login
              </button>
            </p>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="container mx-auto flex min-h-screen">
      <Navigation onLogout={handleLogout} />
      <main className="w-1/2 border-r p-4">
        <h1 className="mb-4 text-xl font-bold">Home</h1>
        <TweetForm onSubmit={handleAddTweet} />
        <div className="space-y-4">
          {tweets.map((tweet) => (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              onAddComment={handleAddComment}
              onLike={handleLike}
              onRetweet={handleRetweet}
              onDeleteComment={handleDeleteComment}
              onLikeComment={handleLikeComment}
              currentUser={user}
            />
          ))}
        </div>
      </main>
      <Trends />
    </div>
  )
}