"use client";

import { useState } from 'react';

export default function ThemeToggle() {
  const [isAlternateColors, setIsAlternateColors] = useState(false);

  const toggleColors = () => {
    document.documentElement.classList.toggle('alternate-colors');
    setIsAlternateColors(!isAlternateColors);
  };

  return (
    <button
      onClick={toggleColors}
      className="p-2 bg-primary hover:bg-darker_primary transition-colors"
      aria-label="Toggle color scheme"
    >
      {isAlternateColors ? (
        <svg width="24" height="24" viewBox="0 0 24 24" className="inline-block">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" className="inline-block">
          {/* Enhanced sun pixel art */}
          <rect x="11" y="2" width="2" height="3" fill="currentColor" />
          <rect x="11" y="19" width="2" height="3" fill="currentColor" />
          <rect x="2" y="11" width="3" height="2" fill="currentColor" />
          <rect x="19" y="11" width="3" height="2" fill="currentColor" />
          <rect x="5" y="5" width="2" height="2" fill="currentColor" />
          <rect x="17" y="17" width="2" height="2" fill="currentColor" />
          <rect x="17" y="5" width="2" height="2" fill="currentColor" />
          <rect x="5" y="17" width="2" height="2" fill="currentColor" />
          <rect x="7" y="3" width="2" height="2" fill="currentColor" />
          <rect x="15" y="3" width="2" height="2" fill="currentColor" />
          <rect x="7" y="19" width="2" height="2" fill="currentColor" />
          <rect x="15" y="19" width="2" height="2" fill="currentColor" />
          <rect x="3" y="7" width="2" height="2" fill="currentColor" />
          <rect x="3" y="15" width="2" height="2" fill="currentColor" />
          <rect x="19" y="7" width="2" height="2" fill="currentColor" />
          <rect x="19" y="15" width="2" height="2" fill="currentColor" />
          <rect x="8" y="8" width="8" height="8" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}
