"use client";

import { motion } from "framer-motion";
import { Heart, AlertTriangle, Wind, Droplets, Baby, Brain, Flame, HelpCircle } from "lucide-react";
import { EMERGENCY_TYPES } from "@/lib/mockData";

const iconMap: Record<string, React.ReactNode> = {
  heart: <Heart className="w-6 h-6" />,
  alert: <AlertTriangle className="w-6 h-6" />,
  wind: <Wind className="w-6 h-6" />,
  droplet: <Droplets className="w-6 h-6" />,
  baby: <Baby className="w-6 h-6" />,
  brain: <Brain className="w-6 h-6" />,
  flame: <Flame className="w-6 h-6" />,
  help: <HelpCircle className="w-6 h-6" />,
};

interface EmergencySelectorProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function EmergencySelector({ selected, onSelect }: EmergencySelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {EMERGENCY_TYPES.map((type, index) => (
        <motion.button
          key={type.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelect(type.id)}
          className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
            selected === type.id
              ? "border-emergency-red bg-emergency-red/20 shadow-lg shadow-emergency-red/20"
              : "border-dark-border bg-dark-card hover:border-emergency-red/50 hover:bg-dark-card/80"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${type.color}20`, color: type.color }}
            >
              {iconMap[type.icon]}
            </div>
            <div>
              <div className="font-semibold text-sm">{type.label}</div>
              <div className="text-xs text-gray-500 capitalize">{type.urgency} priority</div>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
