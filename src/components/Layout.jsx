// src/components/Layout.jsx
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 sm:p-6 text-base sm:text-lg font-semibold flex items-center">
        <img
          src="/suitcase.png"
          alt="Suitcase Icon"
          className="h-4 sm:h-5 w-auto mr-2" // Smaller icon on mobile
        />
        Job Seeker Survival Kit
      </header>

      {/* Main content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black text-center py-4 px-4 sm:px-6 text-sm sm:text-base text-white">
        <p className="flex items-center justify-center gap-2 font-medium">
          <img
            src="/suitcase.png"
            alt="Suitcase Icon"
            className="h-3 sm:h-4 w-auto" // Even smaller in the footer
          />
          <span>
            &copy; 2025 Job Seeker Survival Kit — All rights reserved.
          </span>
        </p>
      </footer>
    </div>
  );
}
