"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Navigation, Phone, User, Ambulance } from "lucide-react";
import { Booking } from "@/types";

interface BookingCardProps {
  booking: Booking | null;
  onCancel?: () => void;
}

export default function BookingCard({ booking, onCancel }: BookingCardProps) {
  if (!booking) return null;

  const statusConfig = {
    pending: { label: "Finding Ambulance", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30" },
    confirmed: { label: "Ambulance Dispatched", color: "text-emergency-red", bg: "bg-emergency-red/10", border: "border-emergency-red/30" },
    picked_up: { label: "Patient Picked Up", color: "text-medical-blue", bg: "bg-medical-blue/10", border: "border-medical-blue/30" },
    delivered: { label: "Reached Hospital", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30" },
  };

  const config = statusConfig[booking.status];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="glass-card p-5 space-y-4"
      >
        {/* Status Header */}
        <div className={`flex items-center justify-between p-3 rounded-lg ${config.bg} border ${config.border}`}>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${config.color.replace("text-", "bg-")} animate-pulse`} />
            <span className={`font-semibold ${config.color}`}>{config.label}</span>
          </div>
          <span className="text-xs text-gray-400">ID: {booking.id}</span>
        </div>

        {/* Ambulance Info */}
        {booking.ambulance && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emergency-red/20 rounded-lg">
                <Ambulance className="w-5 h-5 text-emergency-red" />
              </div>
              <div>
                <div className="font-semibold">{booking.ambulance.id}</div>
                <div className="text-sm text-gray-400">{booking.ambulance.type} Unit</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-dark-border rounded-lg">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <div className="font-medium">{booking.ambulance.driverName}</div>
                <div className="text-sm text-gray-400">Driver</div>
              </div>
            </div>

            {booking.ambulance.eta && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-dark-border rounded-lg">
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <div className="font-bold text-emergency-red text-lg">{booking.ambulance.eta} min</div>
                  <div className="text-sm text-gray-400">Estimated Arrival</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hospital Info */}
        {booking.hospital && (
          <div className="flex items-center gap-3 p-3 bg-medical-blue/10 rounded-lg border border-medical-blue/20">
            <MapPin className="w-5 h-5 text-medical-blue" />
            <div>
              <div className="font-medium">{booking.hospital.name}</div>
              <div className="text-sm text-gray-400">Destination Hospital</div>
            </div>
          </div>
        )}

        {/* Location */}
        <div className="flex items-start gap-3 text-sm text-gray-400">
          <Navigation className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{booking.location.address || `${booking.location.lat.toFixed(4)}, ${booking.location.lng.toFixed(4)}`}</span>
        </div>

        {/* Actions */}
        {booking.status !== "delivered" && (
          <div className="flex gap-3 pt-2">
            <button className="flex-1 py-2.5 bg-medical-blue hover:bg-medical-blue/80 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Call Driver
            </button>
            {onCancel && (
              <button
                onClick={onCancel}
                className="px-4 py-2.5 border border-dark-border hover:bg-dark-border rounded-lg transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
