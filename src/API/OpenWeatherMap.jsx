const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// 1. Current Weather by City Name
export async function fetchWeatherData(city) {
  const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
  if (!response.ok) {
    throw new Error("Failed To Fetch weather");
  }
  return response.json();
}

// 2. Current Weather by Coordinates (Geolocation)
export async function fetchWeatherByCoords(lat, lon) {
  const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
  if (!response.ok) {
    throw new Error("Failed To fetch your location weather");
  }
  return response.json();
}

// 3. 5-Day Forecast by City Name
export async function fetchForecastData(city) {
  const response = await fetch(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`);
  if (!response.ok) {
    throw new Error("Failed To fetch forecast data");
  }
  return response.json();
}
