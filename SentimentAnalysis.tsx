import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function SentimentAnalysis() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSentimentData();
  }, []);

  const fetchSentimentData = async () => {
    try {
      const response = await fetch('/api/analytics/sentiment');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching sentiment data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Sentiment Analysis</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <BarChart
              width={800}
              height={400}
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="positive" fill="#22c55e" name="Positive" />
              <Bar dataKey="negative" fill="#ef4444" name="Negative" />
              <Bar dataKey="neutral" fill="#94a3b8" name="Neutral" />
            </BarChart>
          </div>
        </div>
      )}
    </div>
  );
}