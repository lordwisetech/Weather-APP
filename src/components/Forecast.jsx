import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchForecastData } from '../API/OpenWeatherMap.jsx';

const styles = {
  container: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '12px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
    gap: '12px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '16px 10px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  day: {
    fontWeight: 'bold',
    color: '#555',
    marginBottom: '8px',
  },
  icon: {
    width: '40px',
    height: '40px',
    margin: '4px auto',
    display: 'block',
  },
  temp: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#222',
  },
  statusText: {
    textAlign: 'center',
    color: '#777',
    fontSize: '14px',
    padding: '12px 0',
  },
};

export default function Forecast({ city }) {
  // 1. Fetch 5-day forecast using React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['forecast', city],
    queryFn: () => fetchForecastData(city),
    enabled: Boolean(city),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  if (isLoading) {
    return <p style={styles.statusText}>⏳ Loading 5-day forecast...</p>;
  }

  if (isError) {
    return <p style={styles.statusText}>❌ Could not load forecast: {error?.message}</p>;
  }

  if (!data?.list) return null;

  // 2. Filter data: OpenWeather gives 8 readings per day (every 3 hours).
  // We pick the reading closest to 12:00 PM for each day.
  const dailyForecasts = data.list.filter((reading) =>
    reading.dt_txt.includes('12:00:00')
  );

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>5-Day Forecast</h3>
      <div style={styles.grid}>
        {dailyForecasts.map((item) => {
          // Format date string to short day name (e.g., "Mon", "Tue")
          const dayName = new Date(item.dt_txt).toLocaleDateString('en-US', {
            weekday: 'short',
          });
          const temp = Math.round(item.main?.temp ?? 0);
          const iconCode = item.weather?.[0]?.icon;
          const description = item.weather?.[0]?.description ?? '';

          return (
            <div key={item.dt} style={styles.card}>
              <div style={styles.day}>{dayName}</div>
              {iconCode && (
                <img
                  src={`https://openweathermap.org/img/wn/${iconCode}.png`}
                  alt={description}
                  style={styles.icon}
                />
              )}
              <div style={styles.temp}>{temp}°C</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}