import { useState } from "react";
import { Heart, MessageCircle, Repeat, Trash2, ThumbsUp } from "lucide-react";

interface Comment {
  id: number;
  content: string;
  username: string;
  likes: string[];
}

interface Tweet {
  id: number;
  content: string;
  username: string;
  comments: Comment[];
  likes: string[];
  retweets: string[];
}

interface TweetCardProps {
  tweet: Tweet;
  onAddComment: (tweetId: number, content: string) => void;
  onLike: (tweetId: number) => void;
  onRetweet: (tweetId: number) => void;
  onDeleteComment: (tweetId: number, commentId: number) => void;
  onLikeComment: (tweetId: number, commentId: number) => void;
  currentUser: string;
}

export function TweetCard({
  tweet,
  onAddComment,
  onLike,
  onRetweet,
  onDeleteComment,
  onLikeComment,
  currentUser,
}: TweetCardProps) {
  const [showComments, setShowComments] = useState(false);

  const handleAddComment = (content: string) => {
    onAddComment(tweet.id, content);
  };

  const isLiked = tweet.likes.includes(currentUser);
  const isRetweeted = tweet.retweets.includes(currentUser);

  return (
    <div className="mb-4 border border-gray-300 rounded-lg p-4">
      <div className="flex items-center">
        <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
          <img
            src={`https://i.pravatar.cc/32?img=${tweet.id}`}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="ml-2">
          <p className="font-semibold">{tweet.username}</p>
          <p className="text-sm text-gray-500">@{tweet.username.toLowerCase()}</p>
        </div>
      </div>
      <div className="mt-2">
        <p>{tweet.content}</p>
      </div>
      <div className="mt-4 flex justify-between border-t pt-2">
        <button
          className="flex items-center text-gray-500 hover:text-gray-700"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          {tweet.comments.length}
        </button>
        <button
          className={`flex items-center ${
            isRetweeted ? "text-blue-500" : "text-gray-500"
          } hover:text-blue-700`}
          onClick={() => onRetweet(tweet.id)}
        >
          <Repeat className="mr-2 h-4 w-4" />
          {tweet.retweets.length}
        </button>
        <button
          className={`flex items-center ${
            isLiked ? "text-red-500" : "text-gray-500"
          } hover:text-red-700`}
          onClick={() => onLike(tweet.id)}
        >
          <Heart className="mr-2 h-4 w-4" />
          {tweet.likes.length}
        </button>
      </div>
      {showComments && (
        <div className="mt-4">
          <div className="mb-2">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a comment..."
              rows={2}
              onChange={(e) => handleAddComment(e.target.value)}
            />
            <button
              className="mt-2 py-1 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => handleAddComment}
            >
              Comment
            </button>
          </div>
          {tweet.comments.map((comment) => (
            <div key={comment.id} className="mt-2 border-t pt-2">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{comment.username}</p>
                {comment.username === currentUser && (
                  <button
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => onDeleteComment(tweet.id, comment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <p>{comment.content}</p>
              <button
                className={`mt-2 flex items-center ${
                  comment.likes.includes(currentUser)
                    ? "text-blue-500"
                    : "text-gray-500"
                } hover:text-blue-700`}
                onClick={() => onLikeComment(tweet.id, comment.id)}
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                {comment.likes.length}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
