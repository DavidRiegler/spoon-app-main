'use client';

import { useRouter } from 'next/navigation';
import { Navigation } from "../../navigation";
import { Trends } from "../../trends";
import { TweetCard } from "../../tweet-card";

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const profile = {
    username: 'CurrentUser',
    bio: 'Passionate developer | Coffee enthusiast | Open source contributor',
    following: 250,
    followers: 1000,
    joinDate: 'Joined September 2021'
  };

  const tweets = [
    {
      id: 1,
      content: "Just pushed a major update to my open-source project. Check it out!",
      username: "CurrentUser",
      comments: [],
      likes: ["TechGuru", "CodeMaster"],
      retweets: ["WebDev101"]
    },
    {
      id: 2,
      content: "Excited to attend the upcoming tech conference next month!",
      username: "CurrentUser",
      comments: [
        { id: 1, content: "Which one? I might go too!", username: "TechEnthusiast", likes: [] }
      ],
      likes: ["DesignPro"],
      retweets: []
    }
  ];

  return (
    <div className="container mx-auto flex min-h-screen">
      <Navigation onLogout={handleLogout} />
      <main className="w-1/2 border-r p-4">
        <div className="bg-white rounded-lg shadow-md mb-4">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{profile.username}</h1>
                <p className="text-gray-500">{profile.bio}</p>
                <p className="text-sm text-gray-400 mt-2">{profile.joinDate}</p>
              </div>
              <button>Edit Profile</button>
            </div>
            <div className="flex mt-4">
              <p className="mr-4">
                <span className="font-bold">{profile.following}</span> Following
              </p>
              <p>
                <span className="font-bold">{profile.followers}</span> Followers
              </p>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-4">Tweets</h2>
        <div className="space-y-4">
          {tweets.map((tweet) => (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              onAddComment={() => {}}
              onLike={() => {}}
              onRetweet={() => {}}
              onDeleteComment={() => {}}
              onLikeComment={() => {}}
              currentUser={profile.username}
            />
          ))}
        </div>
      </main>
      <Trends />
    </div>
  );
}
