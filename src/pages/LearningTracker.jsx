import React, { useState, useEffect } from 'react';

const initialResources = [
  {
    id: 1,
    title: 'FreeCodeCamp: JavaScript Basics',
    type: 'Tutorial',
    link: 'https://www.freecodecamp.org/learn',
    completed: false,
  },
  {
    id: 2,
    title: 'MDN: CSS Flexbox',
    type: 'Article',
    link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout',
    completed: false,
  },
  {
    id: 3,
    title: 'YouTube: React Crash Course',
    type: 'Video',
    link: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
    completed: false,
  },
];

const STORAGE_KEY = 'learning-resources';

export default function LearningTracker() {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [link, setLink] = useState('');

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setResources(parsed);
        } else {
          setResources(initialResources);
        }
      } catch {
        setResources(initialResources);
      }
    } else {
      setResources(initialResources);
    }
  }, []);

  // Save to localStorage whenever resources change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
  }, [resources]);

  const toggleComplete = (id) => {
    const updated = resources.map((res) =>
      res.id === id ? { ...res, completed: !res.completed } : res
    );
    setResources(updated);
  };

  const addResource = (e) => {
    e.preventDefault();
    if (!title.trim() || !type.trim() || !link.trim()) return;

    const newResource = {
      id: Date.now(),
      title,
      type,
      link,
      completed: false,
    };

    setResources([...resources, newResource]);
    setTitle('');
    setType('');
    setLink('');
  };

  const completedCount = resources.filter((r) => r.completed).length;
  const progressPercent = resources.length
    ? (completedCount / resources.length) * 100
    : 0;

  return (
    <div className="p-6 max-w-2xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-5 text-center">Learning Tracker</h2>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-1 text-sm font-medium">
          <span>
            Progress: {completedCount} / {resources.length} completed
          </span>
          <span>{progressPercent.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-400 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Add New Resource Form */}
      <form onSubmit={addResource} className="bg-gray-300 rounded p-4 mb-6 text-black space-y-3">
        <h3 className="text-lg font-semibold text-center text-white">Add New Resource</h3>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 rounded border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type (e.g., Video, Article)"
          className="w-full p-2 rounded border"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="url"
          placeholder="Link"
          className="w-full p-2 rounded border"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Add Resource
        </button>
      </form>

      {/* Resource List */}
      {resources.length === 0 ? (
        <p className="text-gray-400 italic text-center">
          No learning resources available.
        </p>
      ) : (
        <ul className="space-y-4">
          {resources.map((resource) => (
            <li
              key={resource.id}
              style={{
                backgroundColor: 'rgba(45, 45, 45, 0.85)',
                color: 'white',
              }}
              className="flex items-center justify-between p-4 rounded shadow mb-4"
            >
              <div>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline hover:text-green-400 transition-colors"
                >
                  {resource.title}
                </a>
                <p className="text-sm text-gray-300">{resource.type}</p>
              </div>
              <input
                type="checkbox"
                className="w-5 h-5 accent-green-600 cursor-pointer"
                checked={resource.completed}
                onChange={() => toggleComplete(resource.id)}
                aria-label={`Mark ${resource.title} as completed`}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
