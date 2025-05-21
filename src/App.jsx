import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import JobTracker from './pages/JobTracker';
import ResumeBuilder from './pages/ResumeBuilder';
import InterviewPrep from './pages/InterviewPrep';
import LearningTracker from './pages/LearningTracker';
import Motivation from './pages/Motivation';
import Calendar from './pages/Calendar';
import CoverLetter from './pages/CoverLetter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="job-tracker" element={<JobTracker />} />
          <Route path="resume" element={<ResumeBuilder />} />
          <Route path="interview" element={<InterviewPrep />} />
          <Route path="learning" element={<LearningTracker />} />
          <Route path="motivation" element={<Motivation />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="cover-letter" element={<CoverLetter />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
