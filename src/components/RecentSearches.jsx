import React from 'react';

const styles = {
  container: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px',
  },
  list: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: '#e9ecef',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '14px',
    color: '#495057',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
};

export default function RecentSearches({ searches = [], onSelectCity }) {
  if (searches.length === 0) return null; // Hide section if there are no recent searches

  return (
    <div style={styles.container}>
      <div style={styles.title}>Recent Searches:</div>
      <div style={styles.list}>
        {searches.map((cityName, index) => (
          <button
            key={index}
            style={styles.chip}
            onClick={() => onSelectCity(cityName)} // Triggers search on click!
          >
            {cityName}
          </button>
        ))}
      </div>
    </div>
  );
}