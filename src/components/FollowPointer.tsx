"use client";

import stringToColor from "@/lib/stringToColor";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FollowPointer = ({
  x,
  y,
  info,
}: {
  x: number;
  y: number;
  info: {
    name: string;
    email: string;
    avatar: string;
  };
}) => {
  const color = stringToColor(info.email || "1");
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update viewport dimensions
  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate position with viewport-relative constraints
  // First calculate the scaled position

  // Then apply constraints with proper bounds
  const adjustedX = Math.min(
    Math.max(x, 20), // Minimum 40px from left
    viewport.width - 96 // Maximum 40px from right
  );

  const adjustedY = Math.min(
    Math.max(y, 40), // Minimum 40px from top
    viewport.height - 40 // Maximum 40px from bottom
  );

  return (
    <motion.div
      className="h-4 w-4 rounded-full absolute z-50"
      style={{
        top: adjustedY,
        left: adjustedX,
        pointerEvents: "none",
        // Center the element relative to its position
        transform: `translate(-50%, -50%) scale(${
          viewport.width < 768 ? 0.8 : 1
        })`,
      }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={viewport.width < 768 ? "1rem" : "1.5rem"}
        height={viewport.width < 768 ? "1rem" : "1.5rem"}
        viewBox="0 0 24 24"
      >
        <path fill={color} d="M4.5.79v22.42l6.56-6.57h9.29L4.5.79z"></path>
      </svg>
      <motion.div
        style={{ backgroundColor: color }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className={`px-2 py-1 bg-neutral-200 text-white font-bold whitespace-nowrap min-w-max ${
          viewport.width < 768 ? "text-xs" : "text-sm"
        } rounded-full`}
      >
        {info?.name || info.email}
      </motion.div>
    </motion.div>
  );
};

export default FollowPointer;
