"use client";

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import FollowPointer from "./FollowPointer";
import { useEffect, useState } from "react";

const LiveCursorProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();

  // Track local viewport dimensions
  const [viewport, setViewport] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  // Handle viewport changes
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

  // Convert coordinates to viewport percentages
  const handleMove = (x: number, y: number) => {
    const xPercentage = (x / viewport.width) * 100;
    const yPercentage = (y / viewport.height) * 100;

    updateMyPresence({
      cursor: {
        x: xPercentage,
        y: yPercentage,
      },
    });
  };

  // Unified event handler
  const handlePointerMove = (e: React.PointerEvent | TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    handleMove(clientX, clientY);
  };

  const handlePointerLeave = () => {
    updateMyPresence({ cursor: null });
  };

  // Touch event handling
  // useEffect(() => {
  //   const handleTouchMove = (e: TouchEvent) => handlePointerMove(e);
  //   window.addEventListener("touchmove", handleTouchMove);
  //   return () => window.removeEventListener("touchmove", handleTouchMove);
  // }, []);

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchEnd={handlePointerLeave}
      className="flex flex-col min-h-full flex-1 touch-none"
      style={{ touchAction: "none" }}
    >
      {others
        .filter((other) => other.presence.cursor !== null)
        .map(({ connectionId, presence, info }) => {
          const cursorData = presence.cursor!;

          // Calculate position based on original percentages and current viewport
          const x = (cursorData.x / 100) * viewport.width;
          const y = (cursorData.y / 100) * viewport.height;

          return <FollowPointer key={connectionId} info={info} x={x} y={y} />;
        })}
      {children}
    </div>
  );
};

export default LiveCursorProvider;
