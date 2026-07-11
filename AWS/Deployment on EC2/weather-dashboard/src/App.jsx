import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import HistorySidebar from './components/HistorySidebar';
import { CloudSun, History, AlertCircle } from 'lucide-react';
import './App.css';

const API_KEY = '502a6eb64314c31c1ce506a3c878a9c3';
const BACKEND_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'http://localhost:5000' 
  : '';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [history, setHistory] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initial load
  useEffect(() => {
    fetchWeather('Kamra');
    fetchHistory();
  }, []);

  // Fetch search history from Express backend
  const fetchHistory = async () => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/history`);
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (err) {
      console.error('Failed to fetch search history from backend:', err);
    }
  };

  // Add search entry to Express backend
  const saveSearchToHistory = async (city) => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/history`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city })
      });
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (err) {
      console.error('Failed to save search history to backend:', err);
    }
  };

  // Delete search entry from Express backend
  const deleteHistoryItem = async (city) => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/history/${city}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (err) {
      console.error('Failed to delete history item:', err);
    }
  };

  // Clear all search history from Express backend
  const clearAllHistory = async () => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/history`, {
        method: 'DELETE'
      });
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (err) {
      console.error('Failed to clear search history:', err);
    }
  };

  // Fetch weather and forecast from OpenWeatherMap API
  const fetchWeather = async (city) => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Fetch current weather (using metric units for Celsius temps)
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
      );
      
      if (!currentRes.ok) {
        if (currentRes.status === 404) {
          throw new Error('City not found. Please try a different name.');
        }
        throw new Error('Failed to load current weather data.');
      }
      const currentData = await currentRes.json();

      // Convert wind speed from m/s to mph to match the layout mock exactly (1 m/s = 2.23694 mph)
      if (currentData.wind && currentData.wind.speed !== undefined) {
        currentData.wind.speed = parseFloat((currentData.wind.speed * 2.23694).toFixed(1));
      }

      // 2. Fetch forecast (using metric units)
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
      );

      if (!forecastRes.ok) {
        throw new Error('Failed to load weather forecast data.');
      }
      const forecastData = await forecastRes.json();

      setCurrentWeather(currentData);
      setForecast(forecastData);

      // Save search query to history backend (avoid logging default initial load unless manually queried)
      saveSearchToHistory(currentData.name);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-layout">
      {/* Top Header Panel */}
      <header className="app-header">
        <div className="brand-title">
          <CloudSun className="brand-icon" size={28} />
          <span>Skyline Weather</span>
        </div>
        
        <div className="header-actions">
          <SearchBar onSearch={fetchWeather} isLoading={isLoading} />
          
          <button 
            className="btn-icon" 
            onClick={() => setIsSidebarOpen(true)}
            title="Search History"
          >
            <History size={20} />
          </button>
        </div>
      </header>

      {/* Main dashboard content */}
      <main>
        {error && (
          <div className="error-message">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {isLoading && !currentWeather ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Fetching local meteorological conditions...</p>
          </div>
        ) : (
          <WeatherCard 
            currentWeather={currentWeather} 
            forecast={forecast} 
          />
        )}
      </main>

      {/* ChatGPT-style Collapsible Search History Sidebar on Right */}
      <HistorySidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        history={history}
        onSelectItem={fetchWeather}
        onDeleteItem={deleteHistoryItem}
        onClearAll={clearAllHistory}
      />
    </div>
  );
}

export default App;
