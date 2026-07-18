import { Location, Ambulance, Hospital } from "@/types";

// Delhi coordinates
export const DELHI_CENTER: Location = { lat: 28.6139, lng: 77.2090 };

export const HOSPITALS: Hospital[] = [
  {
    id: "H1",
    name: "AIIMS Delhi",
    location: { lat: 28.5672, lng: 77.2100, address: "Ansari Nagar, New Delhi" },
    specialties: ["Trauma", "Cardiac", "Neuro"],
  },
  {
    id: "H2",
    name: "Safdarjung Hospital",
    location: { lat: 28.5733, lng: 77.2000, address: "Ansari Nagar West, New Delhi" },
    specialties: ["Emergency", "Burns", "Ortho"],
  },
  {
    id: "H3",
    name: "Max Super Speciality",
    location: { lat: 28.6353, lng: 77.2250, address: "Saket, New Delhi" },
    specialties: ["Cardiac", "Cancer", "Transplant"],
  },
  {
    id: "H4",
    name: "Fortis Escorts",
    location: { lat: 28.5605, lng: 77.2749, address: "Okhla Road, New Delhi" },
    specialties: ["Cardiac", "Emergency"],
  },
  {
    id: "H5",
    name: "BLK-Max Hospital",
    location: { lat: 28.6435, lng: 77.1785, address: "Pusa Road, New Delhi" },
    specialties: ["Multi-Specialty", "Trauma"],
  },
];

export const AMBULANCES: Ambulance[] = [
  {
    id: "AMB-001",
    driverName: "Rajesh Kumar",
    hospital: "AIIMS Delhi",
    location: { lat: 28.5672, lng: 77.2100 },
    status: "available",
    type: "ALS",
  },
  {
    id: "AMB-002",
    driverName: "Suresh Singh",
    hospital: "Safdarjung Hospital",
    location: { lat: 28.5733, lng: 77.2000 },
    status: "available",
    type: "BLS",
  },
  {
    id: "AMB-003",
    driverName: "Amit Sharma",
    hospital: "Max Super Speciality",
    location: { lat: 28.6353, lng: 77.2250 },
    status: "available",
    type: "ICU",
  },
  {
    id: "AMB-004",
    driverName: "Vikram Patel",
    hospital: "Fortis Escorts",
    location: { lat: 28.5605, lng: 77.2749 },
    status: "available",
    type: "ALS",
  },
];

export const EMERGENCY_TYPES = [
  { id: "cardiac", label: "Cardiac Emergency", icon: "heart", color: "#DC2626", urgency: "critical" },
  { id: "accident", label: "Road Accident", icon: "alert", color: "#DC2626", urgency: "critical" },
  { id: "breathing", label: "Breathing Difficulty", icon: "wind", color: "#EA580C", urgency: "high" },
  { id: "bleeding", label: "Severe Bleeding", icon: "droplet", color: "#DC2626", urgency: "critical" },
  { id: "pregnancy", label: "Pregnancy Emergency", icon: "baby", color: "#EA580C", urgency: "high" },
  { id: "stroke", label: "Stroke Symptoms", icon: "brain", color: "#DC2626", urgency: "critical" },
  { id: "burns", label: "Burns/Scalds", icon: "flame", color: "#EA580C", urgency: "high" },
  { id: "other", label: "Other Emergency", icon: "help", color: "#2563EB", urgency: "medium" },
];

// Generate route points between two locations (simulated)
export function generateRoute(start: Location, end: Location, points: number = 50): Location[] {
  const route: Location[] = [];
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    // Add slight curve for realism
    const curve = Math.sin(t * Math.PI) * 0.002;
    route.push({
      lat: start.lat + (end.lat - start.lat) * t + curve,
      lng: start.lng + (end.lng - start.lng) * t,
    });
  }
  return route;
}

// Calculate distance in km
export function calculateDistance(loc1: Location, loc2: Location): number {
  const R = 6371;
  const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
  const dLng = (loc2.lng - loc1.lng) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Get ETA in minutes based on distance
export function getETA(distanceKm: number): number {
  const speedKmh = 35; // Average ambulance speed in city
  return Math.ceil((distanceKm / speedKmh) * 60);
}

// Find nearest hospital
export function findNearestHospital(location: Location): Hospital {
  let nearest = HOSPITALS[0];
  let minDist = Infinity;
  HOSPITALS.forEach(h => {
    const dist = calculateDistance(location, h.location);
    if (dist < minDist) {
      minDist = dist;
      nearest = { ...h, distance: dist };
    }
  });
  return nearest;
}
