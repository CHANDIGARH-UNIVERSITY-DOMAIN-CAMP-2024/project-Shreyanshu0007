import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { SentimentData } from '../../types';

interface Props {
  data: SentimentData[];
}

export default function SentimentChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Sentiment Analysis by Location</h2>
      <div className="w-full h-[400px]">
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
  );
}