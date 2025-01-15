import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { AlertTriangle, Filter, RefreshCw } from 'lucide-react';

export default function MonitoringDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hashtag, setHashtag] = useState('#disaster');

  useEffect(() => {
    fetchPosts();
  }, [hashtag]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/facebook/posts?hashtag=${hashtag}`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Facebook Monitoring Dashboard</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={hashtag}
              onChange={(e) => setHashtag(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter hashtag..."
            />
          </div>
          <button
            onClick={fetchPosts}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post: any) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className={`h-5 w-5 ${
                    post.sentiment === 'positive' ? 'text-green-500' :
                    post.sentiment === 'negative' ? 'text-red-500' :
                    'text-yellow-500'
                  }`} />
                  <div>
                    <p className="text-sm text-gray-500">{post.location}</p>
                    <p className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-500">
                  {post.reactions} reactions
                </span>
              </div>
              <p className="mt-4">{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}