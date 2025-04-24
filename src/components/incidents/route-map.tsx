import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline,  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const FIRE_STATION_COORDS = [40.73061, -73.935242];

const containerStyle = {
  width: '100%',
  height: '400px',
};

const RouteMap: React.FC = () => {
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [route, setRoute] = useState<[number, number][]>([]);
  const [info, setInfo] = useState<{ duration: number; distance: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const openCageApiKey = "681d218135184b1ea9015eb0f37ba41a"; // Replace with your OpenCage API key
  const openRouteServiceApiKey = "5b3ce3597851110001cf624809c8d404b921499aa77853f0156445ec"; // Replace with your OpenRouteService API key

  const handleSearch = async () => {
    if (!address) return;
    setLoading(true);
    setError('');
    setCoords(null);
    setRoute([]);
    setInfo(null);

    try {
      // Geocode the address
      const geocodeRes = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${openCageApiKey}`
      );
      const geocodeData = await geocodeRes.json();
      const location = geocodeData.results[0]?.geometry;

      if (!location) throw new Error('Address not found');
      const destCoords: [number, number] = [location.lat, location.lng];
      setCoords(destCoords);

      // Directions API
      const directionsRes = await fetch(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${openRouteServiceApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            coordinates: [
              [FIRE_STATION_COORDS[1], FIRE_STATION_COORDS[0]],
              [destCoords[1], destCoords[0]],
            ],
          }),
        }
      );
      const directionsData = await directionsRes.json();

      if (!directionsData.features?.[0]) throw new Error('Route not found');
      const path = directionsData.features[0].geometry.coordinates;
      const routeCoords = path.map(([lng, lat]: [number, number]) => [lat, lng]);

      const duration = directionsData.features[0].properties.segments[0].duration / 60; // in minutes
      const distance = directionsData.features[0].properties.segments[0].distance / 1000; // in km

      setRoute(routeCoords);
      setInfo({ duration: Math.round(duration), distance: Math.round(distance * 10) / 10 });
    } catch (err) {
      console.error(err);
      setError('Could not calculate route.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-3">
        helo
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="p-2 border rounded w-full"
        placeholder="Enter destination address..."
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Get Route
      </button>

      {loading && <div className="text-sm text-gray-500">Calculating route...</div>}
      {info && (
        <div className="text-sm text-green-600">
          {info.duration} min ({info.distance} km)
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}

      <MapContainer style={containerStyle} center={FIRE_STATION_COORDS} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={FIRE_STATION_COORDS} icon={L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png', iconSize: [25, 41], iconAnchor: [12, 41] })}>
        </Marker>
        {coords && <Marker position={coords} />}
        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </div>
  );
};

export default RouteMap;