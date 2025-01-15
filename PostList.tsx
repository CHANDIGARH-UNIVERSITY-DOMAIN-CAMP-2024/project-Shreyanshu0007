import React from 'react';
import { format } from 'date-fns';
import { MessageCircle, Share2, ThumbsUp } from 'lucide-react';
import type { Post } from '../../types';

interface Props {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{post.author}</h3>
              <p className="text-sm text-gray-500">
                {format(new Date(post.timestamp), 'PPp')} • {post.location}
              </p>
            </div>
            <span className={`px-2 py-1 rounded text-sm ${
              post.type === 'update' ? 'bg-blue-100 text-blue-800' :
              post.type === 'request' ? 'bg-red-100 text-red-800' :
              'bg-green-100 text-green-800'
            }`}>
              {post.type}
            </span>
          </div>
          
          <p className="mt-2">{post.content}</p>
          
          <div className="mt-3 flex space-x-4">
            {post.hashtags.map((tag) => (
              <span key={tag} className="text-blue-600">#{tag}</span>
            ))}
          </div>
          
          <div className="mt-4 flex items-center space-x-6 text-gray-500">
            <button className="flex items-center space-x-1 hover:text-blue-600">
              <ThumbsUp className="h-5 w-5" />
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-600">
              <MessageCircle className="h-5 w-5" />
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-600">
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}