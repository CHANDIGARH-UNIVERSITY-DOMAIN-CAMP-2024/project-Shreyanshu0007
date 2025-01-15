/*
  # Initial Schema Setup for Disaster Management System

  1. New Tables
    - `posts`
      - `id` (text, primary key) - Facebook post ID
      - `content` (text) - Post content
      - `timestamp` (timestamptz) - Post creation time
      - `location` (text) - Location name
      - `sentiment` (text) - Sentiment analysis result
      - `reactions` (int) - Total reaction count
      - `created_at` (timestamptz) - Record creation time
    
  2. Security
    - Enable RLS on `posts` table
    - Add policies for authenticated users to read all posts
    - Add policies for service role to insert/update posts
*/

CREATE TABLE IF NOT EXISTS posts (
  id text PRIMARY KEY,
  content text NOT NULL,
  timestamp timestamptz NOT NULL,
  location text NOT NULL,
  sentiment text NOT NULL CHECK (sentiment IN ('positive', 'negative', 'neutral')),
  reactions integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read posts"
  ON posts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Service role can insert posts"
  ON posts
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update posts"
  ON posts
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);