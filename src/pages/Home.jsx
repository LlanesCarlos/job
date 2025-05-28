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

export default function Home() {
  const [angle, setAngle] = useState(0);
  const [isFlying, setIsFlying] = useState(false);
  const [iconSize, setIconSize] = useState({ width: 48, height: 48 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const iconCount = icons.length;
  const RADIUS = isMobile ? 30 : 12; // in % of container (not vw!)

  // Rotation
  useEffect(() => {
    if (isFlying) return;
    let animationFrameId;
    let lastTimestamp = null;

    const rotate = (timestamp) => {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;

      if (delta >= 100) {
        setAngle((a) => (a + 3.6) % 360);
        lastTimestamp = timestamp;
      }

      animationFrameId = requestAnimationFrame(rotate);
    };

    animationFrameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isFlying]);

  // Resize listeners
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 640;
      setIsMobile(mobile);

      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const scale = mobile ? 0.6 : 1;
        setIconSize({
          width: rect.width * scale,
          height: rect.height * scale,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleGetStarted = () => {
    setIsFlying(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden select-none">
      <div
        className="relative"
        style={{
          width: isMobile ? '80vw' : '24vw',
          height: isMobile ? '80vw' : '24vw',
          maxWidth: '320px',
          maxHeight: '320px',
          minWidth: '200px',
          minHeight: '200px',
        }}
      >
        <button
          ref={buttonRef}
          onClick={handleGetStarted}
          disabled={isFlying}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 text-sm sm:text-base rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-50 z-20"
        >
          Get Started
        </button>

        {icons.map((IconComp, i) => {
          const theta = ((360 / iconCount) * i + angle) * (Math.PI / 180);
          const offsetX = RADIUS * Math.cos(theta);
          const offsetY = RADIUS * Math.sin(theta);

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
                top: `calc(50% + ${offsetY}%)`,
                left: `calc(50% + ${offsetX}%)`,
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
