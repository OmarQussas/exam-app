"use client";

import React, { useEffect, useState } from "react";
import { CircularProgress } from "./circular-progress";

interface CircularTimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
}

export const CircularTimer: React.FC<CircularTimerProps> = ({
  duration,
  onTimeUp,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp]);

  const percentage = (timeLeft / duration) * 100;

  return (
    <div className="flex justify-center items-center">
      <CircularProgress
        value={percentage}
        size={120}
        strokeWidth={10}
        showLabel
        labelClassName="text-blue-500 font-mono text-lg"
        renderLabel={() =>
          `${Math.floor(timeLeft / 60)
            .toString()
            .padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`
        }
        progressClassName="stroke-blue-500"
        className="stroke-gray-200"
      />
    </div>
  );
};
