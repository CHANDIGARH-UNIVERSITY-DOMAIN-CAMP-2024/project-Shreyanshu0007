import React from 'react';
import { Activity, Users, AlertTriangle, MessageSquare } from 'lucide-react';
import SentimentChart from '../components/Dashboard/SentimentChart';
import PostList from '../components/Posts/PostList';

const mockSentimentData = [
  { location: 'New York', positive: 65, negative: 20, neutral: 15 },
  { location: 'Los Angeles', positive: 45, negative: 35, neutral: 20 },
  { location: 'Chicago', positive: 55, negative: 25, neutral: 20 },
];

const mockPosts = [
  {
    id: '1',
    content: 'Emergency shelter set up at Central High School. Volunteers needed! #hurricanerelief',
    author: 'Disaster Response Team',
    location: 'Miami, FL',
    timestamp: '2024-03-15T10:30:00Z',
    sentiment: 'neutral',
    type: 'update',
    hashtags: ['hurricanerelief', 'emergency']
  },
  {
    id: '2',
    content: 'Urgent: Need medical supplies and drinking water in downtown area #disaster #help',
    author: 'Community Aid Network',
    location: 'Miami Beach, FL',
    timestamp: '2024-03-15T09:45:00Z',
    sentiment: 'negative',
    type: 'request',
    hashtags: ['disaster', 'help']
  }
] as const;

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Active Events</h3>
          </div>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold">Volunteers</h3>
          </div>
          <p className="text-3xl font-bold mt-2">256</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h3 className="text-lg font-semibold">Critical Alerts</h3>
          </div>
          <p className="text-3xl font-bold mt-2">3</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-semibold">Posts Today</h3>
          </div>
          <p className="text-3xl font-bold mt-2">1,284</p>
        </div>
      </div>

      <SentimentChart data={mockSentimentData} />
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
        <PostList posts={mockPosts} />
      </div>
    </div>
  );
}