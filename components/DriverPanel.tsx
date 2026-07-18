"use client";

import { motion } from "framer-motion";
import { Navigation, Phone, Clock, MapPin, AlertCircle, Hospital } from "lucide-react";
import { Ambulance, Hospital as HospitalType, Location } from "@/types";

interface DriverPanelProps {
  ambulance: Ambulance;
  patientLocation: Location;
  destinationHospital: HospitalType;
  routeProgress: number;
  phase: "to_patient" | "to_hospital";
  eta: number;
}

export default function DriverPanel({
  ambulance,
  patientLocation,
  destinationHospital,
  routeProgress,
  phase,
  eta,
}: DriverPanelProps) {
  const phaseConfig = {
    to_patient: {
      title: "Heading to Patient",
      subtitle: "Emergency pickup in progress",
      progressColor: "bg-emergency-red",
      targetLabel: "Patient Location",
    },
    to_hospital: {
      title: "Heading to Hospital",
      subtitle: "Transporting patient to care",
      progressColor: "bg-medical-blue",
      targetLabel: "Destination Hospital",
    },
  };

  const config = phaseConfig[phase];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-5 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-bold">{config.title}</div>
          <div className="text-sm text-gray-400">{config.subtitle}</div>
        </div>
        <div className="px-3 py-1 bg-emergency-red/20 text-emergency-red rounded-full text-sm font-semibold">
          {ambulance.id}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Route Progress</span>
          <span className="font-semibold">{Math.round(routeProgress * 100)}%</span>
        </div>
        <div className="h-3 bg-dark-border rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${config.progressColor} rounded-full`}
            style={{ width: `${routeProgress * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* ETA */}
      <div className="flex items-center gap-4 p-4 bg-dark-bg rounded-xl border border-dark-border">
        <div className="p-3 bg-emergency-red/20 rounded-xl">
          <Clock className="w-6 h-6 text-emergency-red" />
        </div>
        <div>
          <div className="text-3xl font-bold text-emergency-red">{eta}</div>
          <div className="text-sm text-gray-400">minutes remaining</div>
        </div>
      </div>

      {/* Navigation Info */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-emergency-red mt-0.5 shrink-0" />
          <div>
            <div className="text-sm text-gray-400">Current Location</div>
            <div className="font-medium">{ambulance.location.lat.toFixed(4)}, {ambulance.location.lng.toFixed(4)}</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Navigation className="w-5 h-5 text-medical-blue mt-0.5 shrink-0" />
          <div>
            <div className="text-sm text-gray-400">{config.targetLabel}</div>
            <div className="font-medium">
              {phase === "to_patient" 
                ? `${patientLocation.lat.toFixed(4)}, ${patientLocation.lng.toFixed(4)}`
                : destinationHospital.name}
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Info (when going to hospital) */}
      {phase === "to_hospital" && (
        <div className="p-4 bg-medical-blue/10 rounded-xl border border-medical-blue/20">
          <div className="flex items-center gap-2 mb-2">
            <Hospital className="w-5 h-5 text-medical-blue" />
            <span className="font-semibold">{destinationHospital.name}</span>
          </div>
          <div className="text-sm text-gray-400">{destinationHospital.location.address}</div>
          <div className="flex flex-wrap gap-1 mt-2">
            {destinationHospital.specialties.map((s) => (
              <span key={s} className="text-xs px-2 py-0.5 bg-medical-blue/20 text-medical-blue rounded-full">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button className="flex-1 py-3 bg-emergency-red hover:bg-emergency-red/80 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
          <AlertCircle className="w-5 h-5" />
          SOS Alert
        </button>
        <button className="flex-1 py-3 bg-medical-blue hover:bg-medical-blue/80 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
          <Phone className="w-5 h-5" />
          Call Hospital
        </button>
      </div>
    </motion.div>
  );
}
