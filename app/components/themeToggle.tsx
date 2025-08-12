"use client";

import { useState } from 'react';
import Image from 'next/image';
import { playSound } from '../soundManager';

export default function ThemeToggle() {
  const [isAlternateColors, setIsAlternateColors] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);


  const toggleColors = () => {
    setIsTransitioning(true);

    if (isAlternateColors) {
      playSound('light_torch');
    }
    else {
      playSound('puff_torch');
    }
    // Show transition for 500ms, then switch theme
    setTimeout(() => {
      document.documentElement.classList.toggle('alternate-colors');
      setIsAlternateColors(!isAlternateColors);
    }, 150);

    // Hide transition after 1000ms total
    setTimeout(() => {
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <button
      onClick={toggleColors}
      className="p-2 relative cursor-pointer"
      aria-label="Toggle color scheme"
      disabled={isTransitioning}
    >
      {isTransitioning ? (
        <Image
          className="w-20 h-20 pixelated animate-pulse"
          src="/transition_mode.webp"
          alt="Transitioning"
          width={32}
          height={32}
        />
      ) : (
        <Image
          className="w-20 h-20 pixelated"
          src={isAlternateColors ? "/dark_mode.webp" : "/light_mode.webp"}
          alt="Theme Swapper Icon"
          width={32}
          height={32}
        />
      )}
    </button>
  );
}
