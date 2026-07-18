"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Location, Ambulance } from "@/types";
import { HOSPITALS } from "@/lib/mockData";

// Fix Leaflet default icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon.src || "/marker-icon.png",
  shadowUrl: markerShadow.src || "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom icons
const ambulanceIcon = L.divIcon({
  className: "custom-ambulance-icon",
  html: `<div style="
    width: 36px; 
    height: 36px; 
    background: #DC2626; 
    border-radius: 50%; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    border: 3px solid white; 
    box-shadow: 0 0 20px rgba(220,38,38,0.6);
    animation: pulse 1.5s infinite;
  ">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
      <path d="M8 6h8M8 6v12M8 6H6a2 2 0 00-2 2v8h2m12-10h2a2 2 0 012 2v8h-2M8 18h8"/>
      <circle cx="7" cy="18" r="1.5" fill="white"/>
      <circle cx="17" cy="18" r="1.5" fill="white"/>
    </svg>
  </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const hospitalIcon = L.divIcon({
  className: "custom-hospital-icon",
  html: `<div style="
    width: 32px; 
    height: 32px; 
    background: #2563EB; 
    border-radius: 8px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    border: 2px solid white;
    box-shadow: 0 2px 8px rgba(37,99,235,0.4);
  ">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
    </svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const userIcon = L.divIcon({
  className: "custom-user-icon",
  html: `<div style="
    width: 20px; 
    height: 20px; 
    background: #3B82F6; 
    border-radius: 50%; 
    border: 3px solid white;
    box-shadow: 0 0 15px rgba(59,130,246,0.5);
  "></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

interface MapComponentProps {
  center: Location;
  userLocation?: Location;
  ambulances?: Ambulance[];
  route?: Location[];
  alertRadius?: number;
  showHospitals?: boolean;
  onMapClick?: (loc: Location) => void;
  height?: string;
}

function MapController({ center }: { center: Location }) {
  const map = useMap();
  useEffect(() => {
    map.setView([center.lat, center.lng], map.getZoom());
  }, [center, map]);
  return null;
}

export default function MapComponent({
  center,
  userLocation,
  ambulances = [],
  route,
  alertRadius,
  showHospitals = true,
  onMapClick,
  height = "100vh",
}: MapComponentProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ height, background: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emergency-red" />
      </div>
    );
  }

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      style={{ height, width: "100%", background: "#0F172A" }}
      zoomControl={false}
      onClick={(e: L.LeafletMouseEvent) => onMapClick?.({ lat: e.latlng.lat, lng: e.latlng.lng })}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <MapController center={center} />

      {/* User Location */}
      {userLocation && (
        <>
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              <div className="text-sm font-semibold">Your Location</div>
            </Popup>
          </Marker>
          <Circle
            center={[userLocation.lat, userLocation.lng]}
            radius={200}
            pathOptions={{ color: "#3B82F6", fillColor: "#3B82F6", fillOpacity: 0.1, weight: 1 }}
          />
        </>
      )}

      {/* Ambulances */}
      {ambulances.map((amb) => (
        <Marker key={amb.id} position={[amb.location.lat, amb.location.lng]} icon={ambulanceIcon}>
          <Popup>
            <div className="p-2 min-w-[180px]">
              <div className="font-bold text-emergency-red">{amb.id}</div>
              <div className="text-sm text-gray-300">Driver: {amb.driverName}</div>
              <div className="text-sm text-gray-300">Type: {amb.type}</div>
              <div className="text-sm text-gray-300">Status: <span className="capitalize">{amb.status}</span></div>
              {amb.eta && <div className="text-sm font-semibold text-emergency-red mt-1">ETA: {amb.eta} min</div>}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Route */}
      {route && route.length > 0 && (
        <Polyline
          positions={route.map((r) => [r.lat, r.lng])}
          pathOptions={{ color: "#DC2626", weight: 4, opacity: 0.8, dashArray: "10, 10" }}
        />
      )}

      {/* Alert Radius */}
      {alertRadius && userLocation && (
        <Circle
          center={[userLocation.lat, userLocation.lng]}
          radius={alertRadius}
          pathOptions={{ color: "#DC2626", fillColor: "#DC2626", fillOpacity: 0.05, weight: 2, dashArray: "5, 5" }}
        />
      )}

      {/* Hospitals */}
      {showHospitals && HOSPITALS.map((h) => (
        <Marker key={h.id} position={[h.location.lat, h.location.lng]} icon={hospitalIcon}>
          <Popup>
            <div className="p-2 min-w-[200px]">
              <div className="font-bold text-medical-blue">{h.name}</div>
              <div className="text-xs text-gray-400 mt-1">{h.location.address}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {h.specialties.map((s) => (
                  <span key={s} className="text-xs px-2 py-0.5 bg-medical-blue/20 text-medical-blue rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
