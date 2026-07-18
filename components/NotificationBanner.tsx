"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface NotificationBannerProps {
  message: string;
  subMessage?: string;
  isVisible: boolean;
  onDismiss?: () => void;
  playSound?: boolean;
}

export default function NotificationBanner({
  message,
  subMessage,
  isVisible,
  onDismiss,
  playSound = true,
}: NotificationBannerProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isVisible && playSound && soundEnabled) {
      // Create oscillator for siren-like sound
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (e) {
        // Audio not supported
      }
    }
  }, [isVisible, playSound, soundEnabled]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className="bg-emergency-red border-b-4 border-emergency-dark shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                >
                  <AlertTriangle className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <div className="text-white font-bold text-lg">{message}</div>
                  {subMessage && <div className="text-white/80 text-sm">{subMessage}</div>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {soundEnabled ? (
                    <Volume2 className="w-5 h-5 text-white" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-white/60" />
                  )}
                </button>
                {onDismiss && (
                  <button
                    onClick={onDismiss}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
