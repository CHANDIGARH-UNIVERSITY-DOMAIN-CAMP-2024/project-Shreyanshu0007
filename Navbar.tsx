import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, BarChart2, Bell, Calendar, MapPin, Activity, LineChart } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <AlertTriangle className="h-8 w-8" />
            <span className="font-bold text-xl">Disaster Watch</span>
          </Link>
          
          <div className="flex space-x-6">
            <Link to="/monitoring" className="flex items-center space-x-1 hover:text-blue-200">
              <Activity className="h-5 w-5" />
              <span>Monitoring</span>
            </Link>
            <Link to="/sentiment" className="flex items-center space-x-1 hover:text-blue-200">
              <LineChart className="h-5 w-5" />
              <span>Sentiment</span>
            </Link>
            <Link to="/events" className="flex items-center space-x-1 hover:text-blue-200">
              <Calendar className="h-5 w-5" />
              <span>Events</span>
            </Link>
            <Link to="/locations" className="flex items-center space-x-1 hover:text-blue-200">
              <MapPin className="h-5 w-5" />
              <span>Locations</span>
            </Link>
            <Link to="/alerts" className="flex items-center space-x-1 hover:text-blue-200">
              <Bell className="h-5 w-5" />
              <span>Alerts</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}