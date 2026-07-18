"use client";

import { motion } from "framer-motion";

interface LoadingScreenProps {
  message?: string;
  subMessage?: string;
}

export default function LoadingScreen({ message = "Loading...", subMessage }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-dark-bg z-50 flex flex-col items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="mb-6"
      >
        <div className="w-20 h-20 bg-emergency-red rounded-full flex items-center justify-center shadow-lg shadow-emergency-red/30">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M8 6h8M8 6v12M8 6H6a2 2 0 00-2 2v8h2m12-10h2a2 2 0 012 2v8h-2M8 18h8"/>
            <circle cx="7" cy="18" r="1.5" fill="white"/>
            <circle cx="17" cy="18" r="1.5" fill="white"/>
          </svg>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-semibold"
      >
        {message}
      </motion.div>
      {subMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-gray-400 mt-2"
        >
          {subMessage}
        </motion.div>
      )}
    </div>
  );
}
