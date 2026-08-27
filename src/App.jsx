import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import RecentSearches from './components/RecentSearches';

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
    <div style={styles.pageWrapper}>
      <main style={styles.appContainer}>
        <header style={styles.header}>
          <h1 style={styles.appTitle}>Weather App</h1>
          <p style={styles.appSubtitle}>Real-time atmospheric insights</p>
        </header>

        <div style={styles.contentSection}>
          <SearchBar onSearch={handleSearch} />
          <RecentSearches searches={recentSearches} onSelectCity={handleSearch} />
          <CurrentWeather city={city} />
          <Forecast city={city} />
        </div>
      </main>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#090d16',
    color: '#f1f5f9',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    boxSizing: 'border-box',
  },
  appContainer: {
    width: '100%',
    maxWidth: '540px',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    border: '1px solid rgba(51, 65, 85, 0.6)',
    borderRadius: '24px',
    padding: '24px 20px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(12px)',
  },
  header: {
    marginBottom: '20px',
  },
  appTitle: {
    margin: 0,
    fontSize: '1.75rem',
    fontWeight: '800',
    letterSpacing: '-0.025em',
    background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  appSubtitle: {
    margin: '4px 0 0 0',
    fontSize: '0.875rem',
    color: '#94a3b8',
    fontWeight: '500',
  },
  contentSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
};
