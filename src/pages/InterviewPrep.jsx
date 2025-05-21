import React, { useState, useEffect } from 'react';

const QUESTIONS = [
  {
    question: 'Tell me about yourself.',
    answer: 'I’m a full-stack developer with experience in React, Node.js, and building scalable web apps.',
  },
  {
    question: 'What is the difference between == and === in JavaScript?',
    answer: '`==` checks for value equality, while `===` checks for both value and type equality.',
  },
  {
    question: 'How do you handle errors in async JavaScript code?',
    answer: 'Using try/catch blocks with async/await, or `.catch()` with Promises.',
  },
  // Add more as needed
];

export default function InterviewPrep() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isMockMode, setIsMockMode] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);

  const current = QUESTIONS[index];

  useEffect(() => {
    let interval;
    if (running && seconds > 0) {
      interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else if (seconds === 0) {
      setRunning(false);
      setIsMockMode(false);
    }
    return () => clearInterval(interval);
  }, [running, seconds]);

  const nextCard = () => {
    setIndex((i) => (i + 1) % QUESTIONS.length);
    setShowAnswer(false);
    setSeconds(60);
    setRunning(false);
    setIsMockMode(false);
  };

  const toggleMockMode = () => {
    if (isMockMode) {
      setRunning(false);
      setIsMockMode(false);
    } else {
      setRunning(true);
      setIsMockMode(true);
      setSeconds(60);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h2 className="text-white text-2xl font-bold mb-5">Interview Prep Toolkit</h2>

      <div
        className="p-6 rounded-lg shadow-lg border"
        style={{
          backgroundColor: 'rgba(45, 45, 45, 0.85)',
          borderColor: 'rgba(255,255,255,0.1)',
          color: 'white',
          userSelect: 'none',
        }}
      >
        <h3 className="text-xl font-semibold mb-3">Q: {current.question}</h3>

        {showAnswer ? (
          <p className="text-green-400 mb-4 select-text">A: {current.answer}</p>
        ) : (
          <button
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded mb-4 transition-colors"
            onClick={() => setShowAnswer(true)}
          >
            Show Answer
          </button>
        )}

        <div className="flex justify-center gap-4 mt-4">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
            onClick={nextCard}
          >
            Next
          </button>
          <button
            className={`px-4 py-2 rounded transition-colors ${
              isMockMode ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
            onClick={toggleMockMode}
          >
            {isMockMode ? 'Mock Mode On (Stop)' : 'Start Mock Interview'}
          </button>
        </div>

        {isMockMode && (
          <div className="mt-5 text-red-400 text-lg font-mono font-semibold select-text">
            Time Left: {seconds}s
          </div>
        )}
      </div>
    </div>
  );
}
