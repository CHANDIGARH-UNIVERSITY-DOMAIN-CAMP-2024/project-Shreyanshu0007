export interface Post {
  id: string;
  content: string;
  author: string;
  location: string;
  timestamp: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  type: 'update' | 'request' | 'event';
  hashtags: string[];
}

export interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: 'donation' | 'rescue' | 'other';
}

export interface SentimentData {
  location: string;
  positive: number;
  negative: number;
  neutral: number;
}