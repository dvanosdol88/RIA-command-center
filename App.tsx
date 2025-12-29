import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CapacityCalculator from './components/miniapps/CapacityCalculator';
import DashboardApp from './DashboardApp';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/calculator" element={<CapacityCalculator />} />
        <Route path="/dashboard" element={<DashboardApp />} />
        {/* Fallback to landing */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
