import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MapComponent: React.FC = () => {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const routingControlRef = useRef<L.Routing.Control | null>(null);

  const calculateRoute = async () => {
    if (!origin || !destination) {
      setError("Please provide both origin and destination.");
      return;
    }

    setError(null);

    try {
      const [originCoords, destinationCoords] = await Promise.all([
        geocodeLocation(origin),
        geocodeLocation(destination),
      ]);

      if (!originCoords || !destinationCoords) {
        setError("Could not find location(s).");
        return;
      }

      // Remove existing routing control if any
      if (routingControlRef.current) {
        mapRef.current?.removeControl(routingControlRef.current);
        routingControlRef.current = null; // Reset reference
      }

      // Create a new routing control
      routingControlRef.current = L.Routing.control({
        waypoints: [L.latLng(originCoords), L.latLng(destinationCoords)],
        routeWhileDragging: true,
      }).addTo(mapRef.current!);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while calculating the route.");
    }
  };

  const geocodeLocation = async (location: string): Promise<[number, number] | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
      );
      const data = await response.json();
      if (data && data[0]) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col md:flex-row gap-2">
        <Input
          placeholder="Enter Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <Input
          placeholder="Enter Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <Button onClick={calculateRoute}>Get Route</Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="w-full h-[500px]">
        <MapContainer
          center={[37.7749, -122.4194]}
          zoom={10}
          className="w-full h-full"
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;