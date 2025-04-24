import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
  Cloud,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  Loader2,
} from "lucide-react";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

export const WeatherDisplay = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locationFetched, setLocationFetched] = useState(false);
  console.log(weather)

  const API_KEY = "1635890035cbba097fd5c26c8ea672a1";

  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain.toLowerCase()) {
      case "clear":
        return <Sun className="h-20 w-20 text-yellow-400" />;
      case "clouds":
        return <Cloud className="h-20 w-20 text-gray-400" />;
      case "rain":
        return <CloudRain className="h-20 w-20 text-blue-400" />;
      case "snow":
        return <CloudSnow className="h-20 w-20 text-blue-200" />;
      default:
        return <CloudSun className="h-20 w-20 text-gray-400" />;
    }
  };

  const fetchWeather = async (query: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City or location not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocationWeather = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(`lat=${latitude}&lon=${longitude}`);
        setLocationFetched(true);
      },
      () => {
        setError("Unable to retrieve your location.");
      }
    );
  };

  useEffect(() => {
    // Fetch weather for the current location on initial load
    if (!locationFetched) {
      fetchLocationWeather();
    }
  }, []);

  useEffect(() => {
    if (city) {
      const timeoutId = setTimeout(() => {
        fetchWeather(`q=${city}`);
      }, 500); // Delay the fetch to prevent excessive API calls

      return () => clearTimeout(timeoutId); // Cleanup timeout on unmount or input change
    }
  }, [city]);

  return (
    <div className="max-md:w-full w-1/2  ">
      <div className="flex mb-6">
        <Input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1"
        />
      </div>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {loading && (
        <div className="flex justify-center items-center">
          <Loader2 className="h-12 w-12 text-gray-400 animate-spin" />
        </div>
      )}

      {weather && (
        <Card className="p-6  backdrop-blur-sm">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{weather.name}</h2>
          
           <div className="grid grid-cols-2 items-center">
           <div className="flex justify-center mb-4">
              {getWeatherIcon(weather.weather[0].main)}
            </div>
           <div className="text-4xl font-bold mb-4">
              {Math.round(weather.main.temp)}°C
            </div>
           
           </div>
           <div className="text-gray-600 mb-4">
              {weather.weather[0].description}
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-semibold">Feels Like</div>
                <div>{Math.round(weather.main.feels_like)}°C</div>
              </div>
              <div>
                <div className="font-semibold">Humidity</div>
                <div>{weather.main.humidity}%</div>
              </div>
              <div>
                <div className="font-semibold">Wind Speed</div>
                <div>{weather.wind.speed} m/s</div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};