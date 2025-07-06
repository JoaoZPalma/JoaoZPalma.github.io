'use client';
import React, { useState, useEffect, useRef } from 'react';
import "../globals.css";

const RotatingIcon: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const icon = eyeRef.current;
      if (!icon) return;

      // Get center position of the icon
      const rect = icon.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate angle between cursor and icon center
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      let newAngle = Math.atan2(deltaY, deltaX) * 180 / Math.PI + 90;

      setAngle(prevAngle => {
        // Find the closest equivalent angle to maintain smooth rotation
        const diff = newAngle - prevAngle;
        if (diff > 180) newAngle -= 360;
        if (diff < -180) newAngle += 360;
        return newAngle;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className='contents'>
      <div className="eye-shadow"></div>
      <div
        ref={eyeRef}
        className="eye-icon"
        style={{
          transform: `rotate(${angle}deg) scale(2.5)`,
        }}
      ></div>
    </div>
  );
};

export default RotatingIcon;
