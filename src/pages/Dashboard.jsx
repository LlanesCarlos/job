import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BriefcaseIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  LightBulbIcon,
  CalendarIcon, 
  PencilSquareIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [animating, setAnimating] = useState(false);
  const [clickedPath, setClickedPath] = useState(null);
  const navigate = useNavigate();

  const tools = [
    { name: 'Job Tracker', description: 'View and manage your applications.', icon: BriefcaseIcon, path: '/job-tracker' },
    { name: 'Resume Builder', description: 'Edit and export your resume.', icon: DocumentTextIcon, path: '/resume' },
    { name: 'Interview Prep', description: 'Practice with flashcards and mock interviews.', icon: ChatBubbleLeftRightIcon, path: '/interview' },
    { name: 'Learning Tracker', description: 'Track your study progress and goals.', icon: AcademicCapIcon, path: '/learning' },
    { name: 'Motivation', description: 'Stay inspired with quotes, milestones, and progress streaks.', icon: LightBulbIcon, path: '/motivation' },
    { name: 'Application Calendar', description: 'Visualize deadlines and interviews on a calendar.', icon: CalendarIcon, path: '/calendar' },
    { name: 'Cover Letter Generator', description: 'Write personalized cover letters quickly.', icon: PencilSquareIcon, path: '/cover-letter' },
  ];
  
  // Dynamic shuffle offsets (translationX, translationY, rotation, scale)
  // These can be generated or randomized, here a simple pattern for demo
  const shuffleTransforms = [
    { x: -20, y: -30, rotate: -10, scale: 0.95, opacity: 0.9 },
    { x: 15, y: -15, rotate: 8, scale: 0.95, opacity: 0.9 },
    { x: -10, y: 20, rotate: -6, scale: 0.95, opacity: 0.9 },
    { x: 20, y: 25, rotate: 12, scale: 0.95, opacity: 0.9 },
    { x: -25, y: 10, rotate: -8, scale: 0.95, opacity: 0.9 },
  ];

  // Flyout transforms with staggered delay, scalable to more cards
  // We'll distribute flyouts in a circle with varied rotation and scale
  const getFlyoutTransform = (index, total) => {
    const angle = (index / total) * 2 * Math.PI; // full circle
    const distance = 300; // px to fly out
    const rotate = (index % 2 === 0 ? -1 : 1) * 30 + (index * 10); // rotate variation
    const x = Math.cos(angle) * distance * (1 + index * 0.1);
    const y = Math.sin(angle) * distance * (1 + index * 0.1);
    return {
      x,
      y,
      rotate,
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.9,
        ease: 'easeIn',
        delay: index * 0.1,
      },
    };
  };

  const handleCardClick = (path) => {
    setAnimating(true);
    setClickedPath(path);
    setTimeout(() => navigate(path), 1500); // match animation duration
  };

  return (
    <div className="container py-5">
      <h2 className="text-center text-white mb-5">Welcome</h2>

      <div className="row g-4 justify-content-center align-items-stretch">
        {tools.map(({ name, description, icon: Icon, path }, index) => {
          const isClicked = clickedPath === path;

          // Animation variants for the card wrapper
          const variants = {
            initial: {
              scale: 1,
              rotate: 0,
              x: 0,
              y: 0,
              opacity: 1,
              zIndex: 0,
            },
            shuffle: () => {
              // For non-clicked cards during animating state, use shuffle transforms
              const t = shuffleTransforms[index % shuffleTransforms.length];
              return {
                x: t.x,
                y: t.y,
                rotate: t.rotate,
                scale: t.scale,
                opacity: t.opacity,
                zIndex: 0,
                transition: { duration: 0.6, ease: 'easeOut' },
              };
            },
            flyout: () => {
              // For non-clicked cards during animating state after shuffle
              return getFlyoutTransform(index, tools.length);
            },
            clicked: {
              scale: 1.1,
              y: -20,
              zIndex: 10,
              rotate: 0,
              opacity: 1,
              transition: { duration: 0.6, ease: 'easeOut' },
            },
          };

          // Determine which variant to apply
          // Phase 1: shuffle (0 to 0.6s)
          // Phase 2: flyout (0.6 to 1.5s)
          // We'll simulate with state animating and clickedPath
          // For simplicity, we animate directly to flyout if animating and not clicked
          let animateVariant = 'initial';

          if (animating) {
            if (isClicked) {
              animateVariant = 'clicked';
            } else {
              // We'll chain flyout after shuffle automatically with framer-motion delay
              animateVariant = ['shuffle', 'flyout'];
            }
          }

          return (
            <motion.div
              key={name}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
              custom={index}
              variants={variants}
              initial="initial"
              animate={animating ? (isClicked ? 'clicked' : ['shuffle', 'flyout']) : 'initial'}
              style={{ cursor: animating ? 'default' : 'pointer', position: 'relative' }}
              onClick={() => !animating && handleCardClick(path)}
            >
              <motion.div
                className="hover-scale d-flex flex-column align-items-center justify-content-center text-center rounded-3 shadow-sm p-4 w-100 h-100"
                style={{
                  backgroundColor: 'rgba(45, 45, 45, 0.85)',
                  color: 'white',
                }}
                whileHover={{ scale: animating ? 1 : 1.03, boxShadow: animating ? 'none' : '0 0 12px rgba(0, 123, 255, 0.4)' }}
              >
                <Icon
                  className="mb-3"
                  style={{
                    width: '48px',
                    height: '48px',
                    color: '#0d6efd',
                    flexShrink: 0,
                  }}
                />
                <h5 className="mb-2">{name}</h5>
                <p className="small mb-0">{description}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
