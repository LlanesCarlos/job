// src/components/Layout.jsx
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="bg-blue-600 text-white px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold flex items-center gap-2">
        <img
          src="/suitcase.png"
          alt="Suitcase Icon"
          className="h-5 w-auto sm:h-6"
        />
        <span>Job Seeker Survival Kit</span>
      </header>

      {/* Main content */}
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black text-white text-sm sm:text-base text-center py-4 sm:py-5 px-4">
        <p className="flex justify-center items-center gap-2 font-medium">
          <img
            src="/suitcase.png"
            alt="Suitcase Icon"
            className="h-4 w-auto sm:h-5"
          />
          <span>
            &copy; 2025 Job Seeker Survival Kit — All rights reserved.
          </span>
        </p>
      </footer>
    </div>
  );
}
