import React, { useState, useEffect } from "react";

function Weather() {
  const [location, setLocation] = useState("");
  const [city, setCity] = useState(
    localStorage.getItem("weatherCity") || "Tokyo"
  );
  const [temperature, setTemperature] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [rain, setRain] = useState("0 mm");
  const [weatherCondition, setWeatherCondition] = useState("");
  const [weatherArt, setWeatherArt] = useState("");
  const [error, setError] = useState(null);

  const apiKey = "7dc916a578d82640dde713a11bb375cf";

  const asciiArt = {
    sunny: `     .
   \\ | /
 '-.;;;.-'
-==;;;;;==-
 .-';;;'-.
   / | \\
     '`,
    partlyCloudy: `     .
   \\ | /
 '-.;;;.-'
-==;;;;:-.
 .-.-(    ).
  (___.__)__)`,
    cloudy: `    .--.
 .-(    ).
(___.__)__)`,
    rainy: `    .--.
 .-(    ).
(___.__)__)
/ / / / / /
/ / / / /`,
    stormy: `    .--.
 .-(    ).
(___.__)__)
    /_/_
     //'
    /'`,
    snowy: `    .--.    
 .-(    ).
(___.__)__)
* * * * * *
 * * * * *`,
    misty: `░░░░░░░░░░░
 ░░░░░░░░░░░
░░░░░░░░░░░`,
  };

  const weatherLogo = `
██╗    ██╗███████╗ █████╗ ████████╗██╗  ██╗███████╗██████╗ 
██║    ██║██╔════╝██╔══██╗╚══██╔══╝██║  ██║██╔════╝██╔══██╗
██║ █╗ ██║█████╗  ███████║   ██║   ███████║█████╗  ██████╔╝
██║███╗██║██╔══╝  ██╔══██║   ██║   ██╔══██║██╔══╝  ██╔══██╗
╚███╔███╔╝███████╗██║  ██║   ██║   ██║  ██║███████╗██║  ██║
 ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
  `;

  const getCoordinates = async (city) => {
    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
      const response = await fetch(geoUrl);
      const data = await response.json();

      if (!data || data.length === 0) {
        setError("City not found");
        return null;
      }

      return {
        lat: data[0].lat,
        lon: data[0].lon,
      };
    } catch (error) {
      setError("Error fetching coordinates");
      return null;
    }
  };

  const getWeatherData = async (lat, lon) => {
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
      const response = await fetch(weatherUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      setError("Error fetching weather data");
      return null;
    }
  };

  const getWeatherArt = (weatherId) => {
    if (weatherId === 800) {
      return asciiArt.sunny;
    } else if (weatherId > 800 && weatherId < 803) {
      return asciiArt.partlyCloudy;
    } else if (weatherId >= 803) {
      return asciiArt.cloudy;
    } else if (weatherId >= 600 && weatherId < 700) {
      return asciiArt.snowy;
    } else if (weatherId >= 200 && weatherId < 300) {
      return asciiArt.stormy;
    } else if (
      (weatherId >= 300 && weatherId < 400) ||
      (weatherId >= 500 && weatherId < 600)
    ) {
      return asciiArt.rainy;
    } else if (weatherId >= 700 && weatherId < 800) {
      return asciiArt.misty;
    } else {
      return asciiArt.cloudy;
    }
  };

  const displayWeatherInfo = (data) => {
    setTemperature(`${Math.round(data.main.temp)}°F`);
    setFeelsLike(`${Math.round(data.main.feels_like)}°F`);

    if (data.rain && data.rain["1h"]) {
      const rainVolume = data.rain["1h"];
      setRain(`${rainVolume} mm`);
    } else {
      setRain("0 mm");
    }

    setWeatherCondition(data.weather[0].main);

    const weatherId = data.weather[0].id;
    const artToDisplay = getWeatherArt(weatherId);
    setWeatherArt(artToDisplay);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!location) {
      setError("Please enter a city");
      return;
    }

    const capitalized = location.charAt(0).toUpperCase() + location.slice(1);
    setCity(capitalized);

    localStorage.setItem("weatherCity", capitalized);

    setLocation("");
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const coords = await getCoordinates(city);
      if (coords) {
        const weatherData = await getWeatherData(coords.lat, coords.lon);
        if (weatherData) {
          displayWeatherInfo(weatherData);
        }
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="flex flex-col items-center">
      <pre className="text-[0.60rem] md:text-[1.15rem] my-12 text-blue">
        {weatherLogo}
      </pre>

      <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
        <input
          type="text"
          name="location-input"
          id="location-input"
          placeholder="Enter location"
          className="border-b-[1.5px] outline-none"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit" className="hover:underline">
          [Submit]
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="border-[1.5px] p-4 flex flex-col items-center">
        <h2 className="font-black text-[1.5rem] mb-4">{city}</h2>
        <p className="underline">{weatherCondition}</p>
        <pre className="mb-4">{weatherArt}</pre>
        <div className="flex gap-8">
          <div className="flex flex-col items-center">
            <p>Temperature</p>
            <p>{temperature}</p>
          </div>
          <div className="flex flex-col items-center">
            <p>Rain</p>
            <p>{rain}</p>
          </div>
          <div className="flex flex-col items-center">
            <p>Feels like</p>
            <p>{feelsLike}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
