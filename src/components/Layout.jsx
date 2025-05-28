// src/components/Layout.jsx
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 text-lg font-semibold flex items-center">
        <img
          src="/suitcase.png"
          alt="Suitcase Icon"
          style={{ height: '1em', width: 'auto', marginRight: '0.5rem' }}
        />
        Job Seeker Survival Kit
      </header>
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-black text-center py-4 text-sm text-white">
        <p>&copy; 2025 <span className="font-medium">
        <img
          src="/suitcase.png"
          alt="Suitcase Icon"
          style={{ height: '1em', width: 'auto', marginRight: '0.5rem' }}
        />
        Job Seeker Survival Kit</span> — All rights reserved.</p>
      </footer>
    </div>
  );
}
