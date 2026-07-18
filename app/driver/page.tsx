"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { generateRoute, findNearestHospital } from "@/lib/mockData";
import { Location } from "@/types";
import DriverPanel from "@/components/DriverPanel";
import LoadingScreen from "@/components/LoadingScreen";

const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false });

export default function DriverPage() {
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<"to_patient" | "to_hospital">("to_patient");
  const [progress, setProgress] = useState(0);
  const [eta, setEta] = useState(4);

  const ambulance = { id: "AMB-001", driverName: "Rajesh Kumar", hospital: "AIIMS Delhi", location: { lat: 28.5672, lng: 77.2100 }, status: "dispatched" as const, type: "ALS" as const };
  const patientLocation: Location = { lat: 28.6129, lng: 77.2295 };
  const destinationHospital = findNearestHospital(patientLocation);

  const route = phase === "to_patient" ? generateRoute(ambulance.location, patientLocation, 50) : generateRoute(patientLocation, destinationHospital.location, 50);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 1) {
          if (phase === "to_patient") { setPhase("to_hospital"); return 0; }
          clearInterval(interval); return 1;
        }
        const newP = p + 0.015;
        setEta(Math.max(0, Math.ceil(4 * (1 - newP))));
        return newP;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [phase]);

  if (loading) return <LoadingScreen message="Loading driver console..." />;

  const currentPoint = route[Math.floor(progress * route.length)] || route[route.length - 1];
  const currentAmbulance = { ...ambulance, location: currentPoint };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-dark-bg">
      <MapComponent center={currentPoint} ambulances={[currentAmbulance]} route={route} userLocation={phase === "to_hospital" ? undefined : patientLocation} height="100vh" />
      <div className="absolute top-4 right-4 w-80 pointer-events-auto">
        <DriverPanel ambulance={currentAmbulance} patientLocation={patientLocation} destinationHospital={destinationHospital} routeProgress={progress} phase={phase} eta={eta} />
      </div>
    </div>
  );
}
