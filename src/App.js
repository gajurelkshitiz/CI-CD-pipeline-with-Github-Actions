import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState('Getting location...');
  const [weather, setWeather] = useState('Loading weather...');

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  
  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
          fetchWeather(latitude, longitude);
        },
        (error) => {
          setLocation('Unable to get location');
          setWeather('Weather unavailable');
        }
      );
    } else {
      setLocation('Geolocation not supported');
      setWeather('Weather unavailable');
    }
  }, []);

  // Fetch weather data (using a free API)
  const fetchWeather = async (lat, lon) => {
    try {
      // Using OpenWeatherMap API (you'll need to sign up for a free API key)
      // For demo purposes, I'll simulate weather data
      setTimeout(() => {
        const weatherConditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'];
        const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        const temperature = Math.floor(Math.random() * 20) + 15; // Random temp between 15-35°C
        setWeather(`${randomWeather}, ${temperature}°C`);
      }, 1000);
    } catch (error) {
      setWeather('Weather data unavailable');
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="App">
      <div className="container">
        <div className="greeting">
          <h1>🙏 Namaste!</h1>
          <p>Welcome to your personal dashboard</p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h2>📅 Current Time</h2>
            <div className="time-display">
              <div className="time">{formatTime(currentTime)}</div>
              <div className="date">{formatDate(currentTime)}</div>
            </div>
          </div>

          <div className="info-card">
            <h2>📍 Location Info</h2>
            <div className="location-display">
              <p>{location}</p>
            </div>
          </div>

          <div className="info-card">
            <h2>🌤️ Weather</h2>
            <div className="weather-display">
              <p>{weather}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
