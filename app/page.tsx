"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Clock, Activity, ChevronRight } from "lucide-react";
import EmergencySelector from "@/components/EmergencySelector";
import BookingCard from "@/components/BookingCard";
import NotificationBanner from "@/components/NotificationBanner";
import LoadingScreen from "@/components/LoadingScreen";
import { AMBULANCES, generateRoute, findNearestHospital } from "@/lib/mockData";
import { Location, Booking, Ambulance } from "@/types";

const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false });

export default function PatientPage() {
  const [userLocation] = useState<Location>({ lat: 28.6129, lng: 77.2295 });
  const [selectedEmergency, setSelectedEmergency] = useState<string | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [ambulances, setAmbulances] = useState<Ambulance[]>(AMBULANCES);
  const [route, setRoute] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => { setTimeout(() => setLoading(false), 1500); }, []);

  const handleBookAmbulance = useCallback(() => {
    if (!selectedEmergency) return;
    const nearestAmbulance = { ...AMBULANCES[0], status: "dispatched" as const, eta: 4 };
    const nearestHospital = findNearestHospital(userLocation);
    const routePoints = generateRoute(nearestAmbulance.location, userLocation, 60);

    const newBooking: Booking = {
      id: `BK-${Date.now().toString(36).toUpperCase()}`,
      patientName: "Demo User",
      emergencyType: selectedEmergency,
      location: userLocation,
      status: "confirmed",
      ambulance: { ...nearestAmbulance, eta: 4 },
      hospital: nearestHospital,
      createdAt: new Date(),
    };

    setBooking(newBooking);
    setRoute(routePoints);
    setShowAlert(true);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.02;
      if (progress >= 1) {
        clearInterval(interval);
        setBooking((prev) => prev ? { ...prev, status: "picked_up", ambulance: prev.ambulance ? { ...prev.ambulance, eta: 0 } : undefined } : null);
        return;
      }
      const currentPoint = routePoints[Math.floor(progress * routePoints.length)] || routePoints[routePoints.length - 1];
      setAmbulances((prev) => prev.map((a) => a.id === nearestAmbulance.id ? { ...a, location: currentPoint, eta: Math.max(0, Math.ceil(4 * (1 - progress))) } : a));
      setBooking((prev) => prev ? { ...prev, ambulance: prev.ambulance ? { ...prev.ambulance, location: currentPoint, eta: Math.max(0, Math.ceil(4 * (1 - progress))) } : undefined } : null);
    }, 200);
  }, [selectedEmergency, userLocation]);

  if (loading) return <LoadingScreen message="Locating you..." subMessage="Finding nearest emergency services" />;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-dark-bg">
      <NotificationBanner message="🚑 Ambulance Dispatched!" subMessage="Clear the lane - Emergency vehicle approaching" isVisible={showAlert} onDismiss={() => setShowAlert(false)} />
      <MapComponent center={userLocation} userLocation={userLocation} ambulances={ambulances} route={route} height="100vh" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 p-4 pointer-events-auto">
          <div className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emergency-red rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Ambulance Tracker</h1>
                <p className="text-xs text-gray-400">Emergency Response System</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> Live
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
          <AnimatePresence mode="wait">
            {!booking ? (
              <motion.div key="booking-form" initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="glass-card p-5 space-y-4 max-h-[60vh] overflow-y-auto">
                <div>
                  <h2 className="text-xl font-bold mb-1">Emergency?</h2>
                  <p className="text-sm text-gray-400">Select emergency type to book nearest ambulance</p>
                </div>
                <div className="flex items-center gap-2 p-3 bg-dark-bg rounded-xl border border-dark-border">
                  <MapPin className="w-5 h-5 text-emergency-red shrink-0" />
                  <div className="text-sm truncate">
                    <span className="text-gray-400">Location: </span>
                    <span className="font-medium">{userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</span>
                  </div>
                </div>
                <EmergencySelector selected={selectedEmergency} onSelect={setSelectedEmergency} />
                <button onClick={handleBookAmbulance} disabled={!selectedEmergency} className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${selectedEmergency ? "bg-emergency-red hover:bg-emergency-red/80 shadow-lg shadow-emergency-red/20" : "bg-dark-border text-gray-500 cursor-not-allowed"}`}>
                  <Navigation className="w-5 h-5" /> Book Ambulance Now <ChevronRight className="w-5 h-5" />
                </button>
                <div className="flex justify-center gap-6 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Avg response: 4 min</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {AMBULANCES.length} ambulances nearby</span>
                </div>
              </motion.div>
            ) : (
              <BookingCard booking={booking} onCancel={() => { setBooking(null); setRoute([]); setAmbulances(AMBULANCES); }} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
