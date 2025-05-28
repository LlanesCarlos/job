import React, { useState, useEffect, useRef } from 'react';
import {
  BriefcaseIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  LightBulbIcon,
  CalendarIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const icons = [
  BriefcaseIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  LightBulbIcon,
  CalendarIcon,
  PencilSquareIcon,
];

const RADIUS_DESKTOP = 12; // in vw
const RADIUS_MOBILE = 28;  // in vw, bigger orbit on small screens

export default function Home() {
  const [angle, setAngle] = useState(0);
  const [isFlying, setIsFlying] = useState(false);
  const [iconSize, setIconSize] = useState({ width: 48, height: 48 });
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const iconCount = icons.length;

  // Slow rotation
  useEffect(() => {
    if (isFlying) return;
    let animationFrameId;
    let lastTimestamp = null;

    const rotate = (timestamp) => {
      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }
      const delta = timestamp - lastTimestamp;

      // Rotate slowly: 36 degrees every 1000ms = full 360 in 10s
      if (delta >= 100) {
        setAngle((a) => (a + 3.6) % 360); // 3.6 degrees every 100ms
        lastTimestamp = timestamp;
      }

      animationFrameId = requestAnimationFrame(rotate);
    };

    animationFrameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isFlying]);

  // Get button size to match icons
  useEffect(() => {
    const updateIconSize = () => {
      const isMobile = window.innerWidth <= 640; // Tailwind's 'sm' breakpoint
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const scale = isMobile ? 0.6 : 1; // Smaller icons on mobile
        setIconSize({
          width: rect.width * scale,
          height: rect.height * scale,
        });
      }
    };

    updateIconSize();
    window.addEventListener('resize', updateIconSize);
    return () => window.removeEventListener('resize', updateIconSize);
  }, []);

  const handleGetStarted = () => {
    setIsFlying(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center select-none">
      <div
        className="relative"
        style={{
          width: window.innerWidth <= 640 ? '80vw' : '24vw',
          height: window.innerWidth <= 640 ? '80vw' : '24vw',
          maxWidth: '300px',
          maxHeight: '300px',
          minWidth: '200px',
          minHeight: '200px',
        }}
      >
        {/* Center button */}
        <button
          ref={buttonRef}
          onClick={handleGetStarted}
          disabled={isFlying}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 text-sm sm:text-base rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-50 z-20"
        >
          Get Started
        </button>

        {/* Orbiting icons */}
        {icons.map((IconComp, i) => {
          const isMobile = window.innerWidth <= 640;
          const RADIUS = isMobile ? RADIUS_MOBILE : RADIUS_DESKTOP;
          const theta = ((360 / iconCount) * i + angle) * (Math.PI / 180);
          const styles = isFlying
            ? {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(1.1)',
                transition: 'all 1.2s ease-in-out',
                width: `${iconSize.width}px`,
                height: `${iconSize.height}px`,
                zIndex: 10,
              }
            : {
                position: 'absolute',
                top: `calc(50% + ${RADIUS * Math.sin(theta)}vw)`,
                left: `calc(50% + ${RADIUS * Math.cos(theta)}vw)`,
                transform: 'translate(-50%, -50%)',
                transition: 'top 0.1s linear, left 0.1s linear',
                width: `${iconSize.width}px`,
                height: `${iconSize.height}px`,
              };

          return <IconComp key={i} className="text-red-600" style={styles} />;
        })}
      </div>
    </div>
  );
}
