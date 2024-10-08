import Stories from './components/stories'
import Post from './components/post'
import Sidebar from './components/sidebar'
import Navbar from '../Navbar/page'

export default function Socials() {
  const posts = [
    {
      id: 1,
      username: 'fcbayern',
      userImg: 'src/assets/prop-users/fcb.png?height=48&width=48&text=FCB',
      img: 'src/assets/on-boarding/delivery.jpg?height=600&width=338&text=Soccer+Video',
      caption: 'supercharge_beast • Original audio',
      isVideo: true,
      hasStory: true,
    },
  ]

  const stories = [
    { id: 1, username: 'fcbayern', userImg: 'src/assets/prop-users/fcb.png', img: 'src/assets/on-boarding/delivery.jpg?height=56&width=56&text=FCB', hasStory: true },
    { id: 2, username: 'fabriziorom', userImg: 'src/assets/on-boarding/Pizza.jpg', img: '/placeholder.svg?height=56&width=56&text=FR', hasStory: true },
    { id: 3, username: '_mitchhutch', userImg: 'src/assets/on-boarding/Pizza.jpg', img: '/placeholder.svg?height=56&width=56&text=MH', hasStory: false },
    { id: 4, username: 'ahmet_ibo...', userImg: 'src/assets/on-boarding/Pizza.jpg', img: '/placeholder.svg?height=56&width=56&text=AI', hasStory: true },
    { id: 5, username: 'toxic.m1n', userImg: 'src/assets/on-boarding/Pizza.jpg', img: '/placeholder.svg?height=56&width=56&text=TM', hasStory: false },
    { id: 6, username: 'n_sebastian', userImg: 'src/assets/on-boarding/Pizza.jpg', img: '/placeholder.svg?height=56&width=56&text=NS', hasStory: true },
    { id: 7, username: 'k_reka_', userImg: 'src/assets/on-boarding/Pizza.jpg', img: '/placeholder.svg?height=56&width=56&text=KR', hasStory: false },
    { id: 8, username: 'ediz_ates_', userImg: 'src/assets/on-boarding/Pizza.jpg', img: '/placeholder.svg?height=56&width=56&text=EA', hasStory: true },
  ]

  return (
    <div className='min-h-screen'>
        <Navbar />
        <div className="bg-snow text-black">
            <Sidebar />
            <main className="flex-grow">
                <div className="max-w-[630px] mx-auto">
                <Stories stories={stories} />
                <div className="mt-4">
                    {posts.map((post) => (
                      <Post
                        key={post.id}
                        id={post.id}
                        username={post.username}
                        userImg={post.userImg}
                        img={post.img}
                        caption={post.caption}
                        hasStory={post.hasStory}
                        stories={stories}
                      />
                    ))}
                </div>
                </div>
            </main>
        </div>
    </div>
  )
}