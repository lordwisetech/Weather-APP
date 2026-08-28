import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from '../API/OpenWeatherMap.jsx';

const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    marginBottom: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cityName: {
    margin: 0,
    fontSize: '28px',
    color: '#333',
  },
  mainInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    margin: '20px 0',
  },
  temp: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#111',
    margin: 0,
  },
  condition: {
    fontSize: '18px',
    color: '#666',
    margin: 0,
    textTransform: 'capitalize',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    borderTop: '1px solid #eee',
    paddingTop: '16px',
  },
  detailBox: {
    backgroundColor: '#f8f9fa',
    padding: '12px',
    borderRadius: '10px',
  },
  detailLabel: {
    fontSize: '12px',
    color: '#777',
    marginBottom: '4px',
  },
  detailVal: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
  statusText: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '18px',
    color: '#555',
  },
};

export default function CurrentWeather({ city }) {
  // 1. Hook up React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['weather', city],
    queryFn: () => fetchWeatherData(city),
    enabled: Boolean(city), // Only run query if city is provided
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
  });

  // 2. Handle Loading State
  if (isLoading) {
    return (
      <div style={styles.card}>
        <p style={styles.statusText}>⏳ Loading weather data for {city}...</p>
      </div>
    );
  }

  // 3. Handle Error State
  if (isError) {
    return (
      <div style={styles.card}>
        <p style={styles.statusText}>❌ Error: {error?.message || 'Failed to fetch weather'}</p>
      </div>
    );
  }

  // Handle case where data hasn't loaded yet or is missing
  if (!data) return null;

  // 4. Safely extract data using optional chaining
  const temp = Math.round(data.main?.temp ?? 0);
  const condition = data.weather?.[0]?.description ?? 'N/A';
  const humidity = data.main?.humidity ?? 0;
  const windSpeed = Math.round((data.wind?.speed ?? 0) * 3.6); // Convert m/s to km/h
  const iconCode = data.weather?.[0]?.icon;

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.cityName}>
            {data.name}{data.sys?.country ? `, ${data.sys.country}` : ''}
          </h2>
          <p style={styles.condition}>{condition}</p>
        </div>
      </div>

      <div style={styles.mainInfo}>
        {iconCode && (
          <img 
            src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`} 
            alt={condition} 
          />
        )}
        <h1 style={styles.temp}>{temp}°C</h1>
      </div>

      <div style={styles.detailsGrid}>
        <div style={styles.detailBox}>
          <div style={styles.detailLabel}>Humidity</div>
          <div style={styles.detailVal}>{humidity}%</div>
        </div>
        <div style={styles.detailBox}>
          <div style={styles.detailLabel}>Wind Speed</div>
          <div style={styles.detailVal}>{windSpeed} km/h</div>
        </div>
      </div>
    </div>
  );
}