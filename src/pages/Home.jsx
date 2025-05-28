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

  // Handle resize to detect mobile and update icon size
  useEffect(() => {
    function update() {
      setIsMobile(window.innerWidth <= 640);
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const scale = window.innerWidth <= 640 ? 0.6 : 1;
        setIconSize({
          width: rect.width * scale,
          height: rect.height * scale,
        });
      }
    }
    update();

    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

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

      if (delta >= 100) {
        setAngle((a) => (a + 3.6) % 360);
        lastTimestamp = timestamp;
      }

      animationFrameId = requestAnimationFrame(rotate);
    };

    animationFrameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isFlying]);

  const handleGetStarted = () => {
    setIsFlying(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
  };

  // Radius in vw for desktop, in px for mobile (to avoid scrollbars)
  const RADIUS = isMobile ? 70 : 12; // 60px radius on mobile, 12vw radius on desktop

  return (
    <div
      className="flex justify-center items-center select-none"
      style={{ height: '100vh' }} // full viewport height
    >
      <div
        className={`relative ${
          isMobile ? 'w-[80vw] h-[80vw]' : 'w-[24vw] h-[24vw]'
        }`}
        style={{
          maxWidth: isMobile ? '320px' : '300px',
          maxHeight: isMobile ? '320px' : '300px',
          minWidth: isMobile ? '200px' : '200px',
          minHeight: isMobile ? '200px' : '200px',
        }}
      >
        {/* Center button */}
        <button
          ref={buttonRef}
          onClick={handleGetStarted}
          disabled={isFlying}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-50 z-20"
        >
          Get Started
        </button>

        {/* Orbiting icons */}
        {icons.map((IconComp, i) => {
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
                top: isMobile
                  ? `calc(50% + ${RADIUS * Math.sin(theta)}px)`
                  : `calc(50% + ${RADIUS * Math.sin(theta)}vw)`,
                left: isMobile
                  ? `calc(50% + ${RADIUS * Math.cos(theta)}px)`
                  : `calc(50% + ${RADIUS * Math.cos(theta)}vw)`,
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
