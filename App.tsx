import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Locations from './pages/Locations';
import Alerts from './pages/Alerts';
import MonitoringDashboard from './pages/MonitoringDashboard';
import SentimentAnalysis from './pages/SentimentAnalysis';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/monitoring" element={<MonitoringDashboard />} />
            <Route path="/sentiment" element={<SentimentAnalysis />} />
            <Route path="/events" element={<Events />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}