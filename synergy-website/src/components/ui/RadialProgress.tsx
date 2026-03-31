import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface RadialProgressProps {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  color?: "gold" | "teal" | "success" | "error";
}

const colorMap = {
  gold: { stroke: "#D4A373", bg: "rgba(212, 163, 115, 0.1)" },
  teal: { stroke: "#6B9080", bg: "rgba(107, 144, 128, 0.1)" },
  success: { stroke: "#38B000", bg: "rgba(56, 176, 0, 0.1)" },
  error: { stroke: "#EF4444", bg: "rgba(239, 68, 68, 0.1)" },
};

export function RadialProgress({
  value,
  size = 120,
  strokeWidth = 10,
  label,
  sublabel,
  color = "gold",
}: RadialProgressProps) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    // Small delay to allow initial render before animating
    const timeout = setTimeout(() => setCurrentValue(value), 100);
    return () => clearTimeout(timeout);
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (currentValue / 100) * circumference;

  const colors = colorMap[color];

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.bg}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.stroke}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {label && <span className="text-2xl font-bold text-white tracking-tight">{label}</span>}
        {sublabel && <span className="text-xs text-obsidian-400 mt-1 font-medium">{sublabel}</span>}
      </div>
    </div>
  );
}
