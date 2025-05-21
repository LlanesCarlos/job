import React, { useEffect, useState } from 'react';

const quotes = [
  "Success is the sum of small efforts, repeated day in and day out.",
  "Keep going. Everything you need will come to you at the perfect time.",
  "Believe you can and you're halfway there.",
  "You are stronger than you think.",
  "Dream big. Start small. Act now.",
];

const STORAGE_KEY = 'jobhunt-streak';

export default function Motivation() {
  const [quote, setQuote] = useState('');
  const [streak, setStreak] = useState(0);
  const [lastDate, setLastDate] = useState(null);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const today = new Date().toDateString();

    if (stored) {
      const last = new Date(stored.lastDate).toDateString();

      if (last === today) {
        setStreak(stored.streak);
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const isConsecutive = last === yesterday.toDateString();

        const newStreak = isConsecutive ? stored.streak + 1 : 1;
        setStreak(newStreak);
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ streak: newStreak, lastDate: today })
        );
      }
    } else {
      setStreak(1);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ streak: 1, lastDate: today })
      );
    }

    setLastDate(today);
  }, []);

  // Inline styles
  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    background: 'rgba(30, 30, 30, 0.85)',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
    color: 'white',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headingWrapperStyle = {
    maxWidth: '600px',
    margin: '40px auto 20px', // top 40px, bottom 20px, centered horizontally
    color: 'white',
    fontSize: '2rem',
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const quoteStyle = {
    fontSize: '1.25rem',
    fontStyle: 'italic',
    marginBottom: '25px',
    color: '#a0d8ef',
  };

  const streakStyle = {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#4ade80', // Tailwind green-400
    marginBottom: '25px',
  };

  const imgStyle = {
    display: 'block',
    margin: '0 auto',
    width: '256px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 123, 255, 0.4)',
  };

  return (
    <>
      <h2 style={headingWrapperStyle}>Daily Motivation</h2>
      <div style={containerStyle}>
        <p style={quoteStyle}>&ldquo;{quote}&rdquo;</p>

        <div style={streakStyle}>
          🔥 You&apos;ve worked on your job hunt {streak} day{streak !== 1 ? 's' : ''} in a row!
        </div>

        <div>
          <img
            src="https://media.giphy.com/media/3o7aCTfyhYawdOXcFW/giphy.gif"
            alt="Motivation"
            style={imgStyle}
          />
        </div>
      </div>
    </>
  );
}
