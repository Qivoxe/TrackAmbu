"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subtext?: string;
  color: string;
  delay?: number;
}

export default function StatsCard({ icon: Icon, label, value, subtext, color, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="glass-card p-4 flex items-center gap-4"
    >
      <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}20` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-gray-400">{label}</div>
        {subtext && <div className="text-xs text-gray-500 mt-0.5">{subtext}</div>}
      </div>
    </motion.div>
  );
}
