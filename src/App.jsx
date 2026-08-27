
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
        width: '100%',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        background:
          'radial-gradient(circle at 80% 0%, rgba(56,189,248,0.18), transparent 30%), radial-gradient(circle at 0% 40%, rgba(99,102,241,0.12), transparent 35%), #07111f',
        color: '#f8fafc',
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: '20px 12px 40px',
      }}
    >
      <main
        style={{
          width: '100%',
          maxWidth: '1050px',
          margin: '0 auto',
          boxSizing: 'border-box',
        }}
      >
        {/* NAVBAR */}
        <nav
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '42px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: 800,
              letterSpacing: '-0.8px',
              whiteSpace: 'nowrap',
            }}
          >
            weather<span style={{ color: '#38bdf8' }}>.</span>
          </div>

          <div
            style={{
              fontSize: '11px',
              color: '#64748b',
              whiteSpace: 'nowrap',
            }}
          >
            OpenWeather
          </div>
        </nav>

        {/* HERO */}
        <section
          style={{
            width: '100%',
            textAlign: 'center',
            marginBottom: '30px',
            boxSizing: 'border-box',
          }}
        >
          <p
            style={{
              margin: '0 0 10px',
              color: '#38bdf8',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '1.8px',
              textTransform: 'uppercase',
            }}
          >
            Weather at a glance
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(36px, 11vw, 64px)',
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: '-3px',
            }}
          >
            Know your sky.
          </h1>

          <p
            style={{
              width: '100%',
              maxWidth: '450px',
              margin: '16px auto 28px',
              color: '#94a3b8',
              fontSize: '14px',
              lineHeight: 1.7,
              boxSizing: 'border-box',
            }}
          >
            Search any city and get current conditions and the upcoming
            forecast in seconds.
          </p>

          {/* SEARCH BAR */}
          <SearchBar onSearch={handleSearch} />
        </section>

        {/* RECENT SEARCHES */}
        <section
          style={{
            width: '100%',
            marginBottom: '30px',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '12px',
            }}
          >
            <span
              style={{
                color: '#64748b',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}
            >
              Recent
            </span>

            <div
              style={{
                width: '4px',
                height: '4px',
                flexShrink: 0,
                borderRadius: '50%',
                background: '#38bdf8',
              }}
            />
          </div>

          <RecentSearches
            searches={recentSearches}
            onSelectCity={handleSearch}
          />
        </section>

        {/* CURRENT WEATHER */}
        <section
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            padding: '26px 18px',
            boxSizing: 'border-box',
            borderRadius: '28px',
            background:
              'linear-gradient(145deg, rgba(30,64,175,0.28), rgba(15,23,42,0.65))',
            boxShadow: '0 25px 70px rgba(0,0,0,0.3)',
            marginBottom: '18px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'rgba(56,189,248,0.12)',
              filter: 'blur(45px)',
              top: '-70px',
              right: '-50px',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              minWidth: 0,
            }}
          >
            <CurrentWeather city={city} />
          </div>
        </section>

        {/* FORECAST */}
        <section
          style={{
            width: '100%',
            padding: '20px 0',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              marginBottom: '20px',
            }}
          >
            <p
              style={{
                margin: '0 0 5px',
                color: '#38bdf8',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}
            >
              Coming days
            </p>

            <h2
              style={{
                margin: 0,
                fontSize: '26px',
                fontWeight: 750,
                letterSpacing: '-1px',
              }}
            >
              Forecast
            </h2>
          </div>

          <div
            style={{
              width: '100%',
              minWidth: 0,
              overflowX: 'auto',
              boxSizing: 'border-box',
            }}
          >
            <Forecast city={city} />
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            width: '100%',
            textAlign: 'center',
            paddingTop: '30px',
            color: '#475569',
            fontSize: '11px',
            lineHeight: 1.6,
          }}
        >
          <span>Powered by OpenWeather</span>

          <span
            style={{
              margin: '0 7px',
              color: '#1e293b',
            }}
          >
            •
          </span>

          <span>Created by Mayowa</span>
        </footer>
      </main>
    </div>
  );
}

