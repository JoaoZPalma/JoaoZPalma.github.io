'use client';

import React, { useRef } from 'react';
import '../globals.css'; // You can extract or include relevant CSS here

const ChestIcon: React.FC = () => {
  const chestRef = useRef<HTMLDivElement>(null);
  const hoverStartTime = useRef<number | null>(null);

  const handleMouseEnter = () => {
    hoverStartTime.current = Date.now()
  }

  const handleMouseLeave = () => {

    const now = Date.now()
    const hoveredDuration = hoverStartTime.current ? now - hoverStartTime.current : 0;

    if (hoveredDuration >= 700) {
      const chest = chestRef.current;
      if (!chest) return;

      chest.classList.remove('close');
      void chest.offsetWidth; // Trigger reflow
      chest.classList.add('close');

      // Optional: remove the class after the animation finishes
      setTimeout(() => {
        chest.classList.remove('close');
      }, 1000); // match animation duration
    }

    hoverStartTime.current = null;
  };

  return (
    <div
      className="chest-icon mx-auto"
      ref={chestRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    ></div>
  );
};

export default ChestIcon;
