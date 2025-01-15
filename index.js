import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import natural from 'natural';
import { bizSdk, FacebookAdsApi } from 'facebook-nodejs-business-sdk';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Facebook API
const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
const api = FacebookAdsApi.init(accessToken);

// Initialize Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Sentiment analyzer
const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

// Routes
app.get('/api/facebook/posts', async (req, res) => {
  try {
    const { hashtag, location } = req.query;
    const fields = ['message', 'created_time', 'place', 'reactions.summary(total_count)'];
    
    const response = await bizSdk.PagePost.getAll(fields, {
      access_token: accessToken,
      q: hashtag,
      type: 'posts'
    });

    const posts = response.map(post => {
      const sentiment = analyzer.getSentiment(post.message.split(' '));
      return {
        id: post.id,
        content: post.message,
        timestamp: post.created_time,
        location: post.place?.name || 'Unknown',
        sentiment: sentiment > 0 ? 'positive' : sentiment < 0 ? 'negative' : 'neutral',
        reactions: post.reactions?.summary?.total_count || 0
      };
    });

    // Store in Supabase
    await supabase.from('posts').upsert(posts);

    res.json(posts);
  } catch (error) {
    console.error('Error fetching Facebook posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.get('/api/analytics/sentiment', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('location, sentiment')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (error) throw error;

    const analytics = data.reduce((acc, post) => {
      if (!acc[post.location]) {
        acc[post.location] = { positive: 0, negative: 0, neutral: 0 };
      }
      acc[post.location][post.sentiment]++;
      return acc;
    }, {});

    res.json(Object.entries(analytics).map(([location, counts]) => ({
      location,
      ...counts
    })));
  } catch (error) {
    console.error('Error generating analytics:', error);
    res.status(500).json({ error: 'Failed to generate analytics' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});