"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { AlertTriangle, MapPin, Clock, Volume2 } from "lucide-react";
import NotificationBanner from "@/components/NotificationBanner";

const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false });

export default function CitizenPage() {
  const [showAlert, setShowAlert] = useState(false);
  const [countdown, setCountdown] = useState(120);

  const ambulanceLocation = { lat: 28.5900, lng: 77.2200 };
  const citizenLocation = { lat: 28.5950, lng: 77.2250 };

  useEffect(() => { setTimeout(() => setShowAlert(true), 2000); }, []);
  useEffect(() => { if (!showAlert || countdown <= 0) return; const interval = setInterval(() => setCountdown((c) => c - 1), 1000); return () => clearInterval(interval); }, [showAlert, countdown]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-dark-bg">
      <NotificationBanner message="🚨 Emergency Vehicle Approaching!" subMessage={`Ambulance will pass your street in ${minutes}:${seconds.toString().padStart(2, "0")}. Please clear the left lane.`} isVisible={showAlert} onDismiss={() => setShowAlert(false)} />
      <MapComponent center={citizenLocation} userLocation={citizenLocation} ambulances={[{ lat: 28.5900, lng: 77.2200, id: "AMB-001", driverName: "Rajesh", hospital: "AIIMS", status: "dispatched", type: "ALS" }]} alertRadius={500} height="100vh" />
      <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="glass-card p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emergency-red/20 rounded-xl animate-pulse">
              <AlertTriangle className="w-6 h-6 text-emergency-red" />
            </div>
            <div>
              <div className="font-bold text-lg">Lane Clearing Alert</div>
              <div className="text-sm text-gray-400">Stay alert - Emergency vehicle nearby</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-dark-bg rounded-xl border border-dark-border flex items-center gap-2"><MapPin className="w-4 h-4 text-emergency-red" /><span className="text-sm">500m radius</span></div>
            <div className="p-3 bg-dark-bg rounded-xl border border-dark-border flex items-center gap-2"><Clock className="w-4 h-4 text-emergency-red" /><span className="text-sm">{minutes}:{seconds.toString().padStart(2, "0")} min</span></div>
          </div>
          <div className="p-3 bg-emergency-red/10 border border-emergency-red/20 rounded-xl">
            <div className="flex items-start gap-2">
              <Volume2 className="w-5 h-5 text-emergency-red shrink-0 mt-0.5" />
              <div className="text-sm"><span className="font-semibold text-emergency-red">Action Required:</span> Move your vehicle to the left side of the road. Do not block intersections.</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
