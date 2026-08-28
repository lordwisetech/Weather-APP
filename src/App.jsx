import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import RecentSearches from './components/RecentSearches';
import './App.css'; // <-- Import your CSS here!

export default function App() {
  const [city, setCity] = useState('London');
  const [recentSearches, setRecentSearches] = useState(['London', 'Tokyo', 'New York', 'Paris']);

  const handleSearch = (newCity) => {
    setCity(newCity);
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== newCity.toLowerCase());
      return [newCity, ...filtered].slice(0, 5);
    });
  };

  return (
    <div className="page-wrapper">
      <div className="app-container">
        <h1 className="app-title">Weather App</h1>
        <SearchBar onSearch={handleSearch} />
        <CurrentWeather city={city} />
        <RecentSearches searches={recentSearches} onSelectCity={handleSearch} />
        <Forecast city={city} />
      </div>
    </div>
  );
}