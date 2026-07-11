import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  Snowflake, 
  CloudFog, 
  Wind, 
  Droplets,
  Clock
} from 'lucide-react';

// Helper to get corresponding Lucide weather icon
export const getWeatherIcon = (condition, size = 24) => {
  if (!condition) return <Cloud size={size} />;
  
  const cond = condition.toLowerCase();
  if (cond.includes('clear') || cond.includes('sunny')) {
    return <Sun size={size} className="forecast-icon text-amber-500" />;
  } else if (cond.includes('rain') || cond.includes('drizzle')) {
    return <CloudRain size={size} className="forecast-icon text-blue-400" />;
  } else if (cond.includes('thunderstorm') || cond.includes('storm')) {
    return <CloudLightning size={size} className="forecast-icon text-yellow-500" />;
  } else if (cond.includes('snow')) {
    return <Snowflake size={size} className="forecast-icon text-sky-300" />;
  } else if (cond.includes('mist') || cond.includes('fog') || cond.includes('haze') || cond.includes('smoke')) {
    return <CloudFog size={size} className="forecast-icon text-gray-400" />;
  } else {
    return <Cloud size={size} className="forecast-icon text-gray-500" />;
  }
};

function WeatherCard({ currentWeather, forecast }) {
  const [time, setTime] = useState(new Date());

  // Running digital clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!currentWeather || !forecast) return null;

  // Format main current date (DD/MM/YYYY)
  const formatCurrentDate = (dateObj) => {
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Format running clock (hh:mm:ss am/pm)
  const formatClockTime = (dateObj) => {
    return dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).toLowerCase();
  };

  // Dynamic greeting based on current time
  const getGreeting = (dateObj) => {
    const hour = dateObj.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // 1. Process Hourly Forecast (first 6 slots from the forecast list)
  const hourlySlots = forecast.list.slice(0, 6).map((item) => {
    const date = new Date(item.dt * 1000);
    const hourStr = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    });
    return {
      time: hourStr,
      temp: Math.round(item.main.temp),
      condition: item.weather[0].main,
    };
  });

  // 2. Process 6-Day Forecast
  // Group the 40 intervals by calendar day.
  const getWeeklyForecast = () => {
    const dailyData = {};
    
    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString(); // e.g. "Sun Jul 12 2026"
      
      if (!dailyData[dayKey]) {
        dailyData[dayKey] = [];
      }
      dailyData[dayKey].push(item);
    });

    // For each day, grab the item closest to 12 PM (midday)
    const result = [];
    const keys = Object.keys(dailyData);
    
    // Sort keys chronologically
    keys.sort((a, b) => new Date(a) - new Date(b));

    // Limit to 6 days
    for (let i = 0; i < Math.min(keys.length, 6); i++) {
      const dayGroup = dailyData[keys[i]];
      // Find item closest to 12:00:00
      let bestItem = dayGroup[0];
      let bestDiff = Infinity;
      
      dayGroup.forEach(item => {
        const itemDate = new Date(item.dt * 1000);
        const diff = Math.abs(itemDate.getHours() - 12);
        if (diff < bestDiff) {
          bestDiff = diff;
          bestItem = item;
        }
      });

      const forecastDate = new Date(bestItem.dt * 1000);
      let dayName = '';
      
      if (i === 0) {
        dayName = 'Today';
      } else {
        dayName = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });
      }

      result.push({
        dayName,
        temp: Math.round(bestItem.main.temp),
        condition: bestItem.weather[0].main
      });
    }

    // Ensure we have exactly 6 items (in case of api constraints, pad if needed)
    while (result.length < 6 && result.length > 0) {
      const last = result[result.length - 1];
      result.push({
        dayName: 'Next',
        temp: last.temp,
        condition: last.condition
      });
    }

    return result;
  };

  const weeklyForecast = getWeeklyForecast();

  return (
    <div className="dashboard-card">
      {/* Left panel: Main Weather Card */}
      <div className="weather-main-panel">
        <div className="weather-main-header">
          <div className="weather-location">{currentWeather.name}</div>
          <div className="weather-date">{formatCurrentDate(time)}</div>
        </div>

        <div className="weather-center-display">
          <div className="weather-temp-large">
            {Math.round(currentWeather.main.temp)}
          </div>
          <div className="weather-condition-large">
            {currentWeather.weather[0].main}
          </div>
          
          <div className="weather-meta-info">
            <div className="meta-item" title="Wind Speed">
              <Wind size={18} />
              <span>{currentWeather.wind.speed} mph</span>
            </div>
            <div className="meta-item" title="Humidity">
              <Droplets size={18} />
              <span>{currentWeather.main.humidity}%</span>
            </div>
          </div>
        </div>

        {/* Weekly Forecast Row */}
        <div className="weekly-forecast-row">
          {weeklyForecast.map((day, idx) => (
            <div key={idx} className="forecast-day-col">
              <span className="forecast-day-name">{day.dayName}</span>
              {getWeatherIcon(day.condition, 22)}
              <span className="forecast-day-temp">{day.temp}°</span>
              <span className="forecast-day-cond">{day.condition}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel: Digital Clock and Hourly Forecast */}
      <div className="weather-right-panel">
        <div className="right-panel-header">
          <div className="greeting-text">{getGreeting(time)}</div>
          <div className="clock-text">{formatClockTime(time)}</div>
        </div>

        {/* Current Weather Summary */}
        <div className="right-weather-summary">
          <div className="right-summary-temp-cond">
            <span>{Math.round(currentWeather.main.temp)}°</span>
            <span className="right-summary-cond">{currentWeather.weather[0].main}</span>
          </div>
          <div className="right-summary-feels">
            Feels like {Math.round(currentWeather.main.feels_like)}°
          </div>
        </div>

        {/* Hourly Forecast Grid */}
        <div className="hourly-forecast-section">
          <h3 className="section-title">Hourly Forecast</h3>
          <div className="hourly-grid">
            {hourlySlots.map((slot, idx) => (
              <div key={idx} className="hourly-item-card">
                <span className="hourly-time">{slot.time}</span>
                {getWeatherIcon(slot.condition, 18)}
                <span className="hourly-temp">{slot.temp}°</span>
                <span className="hourly-cond">{slot.condition}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
