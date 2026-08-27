import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import RecentSearches from './components/RecentSearches';

export default function App() {
  const [city, setCity] = useState('London');
  const [recentSearches, setRecentSearches] = useState([
    'London',
    'Tokyo',
    'New York',
    'Paris',
  ]);

  const handleSearch = (newCity) => {
    setCity(newCity);

    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== newCity.toLowerCase()
      );

      return [newCity, ...filtered].slice(0, 5);
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at 20% 10%, #243b6b 0%, transparent 35%), linear-gradient(145deg, #07111f 0%, #0b1728 45%, #101d31 100%)',
        color: '#f8fafc',
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: '24px 16px 50px',
        boxSizing: 'border-box',
      }}
    >
      <main
        style={{
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {/* HEADER */}
        <header
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            marginBottom: '28px',
          }}
        >
          <div>
            <p
              style={{
                margin: '0 0 8px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#7dd3fc',
              }}
            >
              Weather intelligence
            </p>

            <h1
              style={{
                margin: 0,
                fontSize: 'clamp(32px, 8vw, 52px)',
                lineHeight: 1,
                fontWeight: 800,
                letterSpacing: '-2px',
              }}
            >
              Weather<span style={{ color: '#38bdf8' }}>ly.</span>
            </h1>

            <p
              style={{
                margin: '12px 0 0',
                color: '#94a3b8',
                fontSize: '15px',
                lineHeight: 1.6,
              }}
            >
              Real-time weather, beautifully presented.
            </p>
          </div>

          <div
            style={{
              alignSelf: 'flex-start',
              padding: '8px 12px',
              borderRadius: '999px',
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(125, 211, 252, 0.15)',
              color: '#bae6fd',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            ● Live weather data
          </div>
        </header>

        {/* SEARCH */}
        <section
          style={{
            padding: '16px',
            borderRadius: '22px',
            background: 'rgba(255,255,255,0.055)',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            backdropFilter: 'blur(20px)',
            marginBottom: '16px',
          }}
        >
          <SearchBar onSearch={handleSearch} />
        </section>

        {/* RECENT SEARCHES */}
        <section
          style={{
            padding: '18px',
            borderRadius: '22px',
            background: 'rgba(255,255,255,0.035)',
            border: '1px solid rgba(255,255,255,0.07)',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '14px',
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  color: '#64748b',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                }}
              >
                Quick access
              </p>

              <h2
                style={{
                  margin: '4px 0 0',
                  fontSize: '18px',
                  fontWeight: 700,
                }}
              >
                Recent searches
              </h2>
            </div>

            <span
              style={{
                color: '#64748b',
                fontSize: '12px',
              }}
            >
              {recentSearches.length} cities
            </span>
          </div>

          <RecentSearches
            searches={recentSearches}
            onSelectCity={handleSearch}
          />
        </section>

        {/* MAIN WEATHER */}
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* CURRENT WEATHER */}
          <div
            style={{
              minHeight: '300px',
              padding: '24px',
              borderRadius: '28px',
              background:
                'linear-gradient(145deg, rgba(56,189,248,0.16), rgba(255,255,255,0.045))',
              border: '1px solid rgba(125,211,252,0.16)',
              boxShadow:
                '0 25px 70px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    color: '#7dd3fc',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  Current conditions
                </p>

                <h2
                  style={{
                    margin: '5px 0 0',
                    fontSize: '22px',
                    fontWeight: 750,
                  }}
                >
                  {city}
                </h2>
              </div>

              <span
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  display: 'grid',
                  placeItems: 'center',
                  background: 'rgba(255,255,255,0.07)',
                  fontSize: '18px',
                }}
              >
                ☁
              </span>
            </div>

            <CurrentWeather city={city} />
          </div>

          {/* FORECAST */}
          <div
            style={{
              padding: '22px',
              borderRadius: '28px',
              background: 'rgba(255,255,255,0.045)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
              backdropFilter: 'blur(20px)',
              overflow: 'hidden',
            }}
          >
            <div style={{ marginBottom: '18px' }}>
              <p
                style={{
                  margin: 0,
                  color: '#64748b',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                Outlook
              </p>

              <h2
                style={{
                  margin: '5px 0 0',
                  fontSize: '22px',
                  fontWeight: 750,
                }}
              >
                5-day forecast
              </h2>
            </div>

            <Forecast city={city} />
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            textAlign: 'center',
            paddingTop: '35px',
            color: '#475569',
            fontSize: '12px',
          }}
        >
          Built with React · Weather data updated in real time
        </footer>
      </main>
    </div>
  );
}
