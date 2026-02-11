import React from 'react';
import { Routes, Route } from 'react-router-dom'; // REMOVED 'BrowserRouter' from imports
import { ModalProvider, useModal } from './context/ModalContext';

// Components
import Navbar from './components/Navbar';
import CounsellingSelector from './components/CounsellingSelector';
import Chatbox from './components/Chatbox'

// Pages
import Home from './pages/Home';
import Predictor from './pages/Predictor';
import JacPredictor from './pages/JacPredictor';
import PercentileToRank from './pages/PercentileToRank';
import Aboutus from './pages/About'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/react"
// Helper to render the Modal globally
const GlobalModal = () => {
  const { isModalOpen, closeModal } = useModal();
  return <CounsellingSelector isOpen={isModalOpen} onClose={closeModal} />;
};

function App() {
  return (
    // 1. ModalProvider wraps everything
    <ModalProvider>
      {/* 2. Navbar is now a direct child (The Router is in main.jsx, so Links will still work!) */}
      <Navbar />

      <GlobalModal />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/josaa/predict" element={<Predictor />} />
        <Route path="/jac/predict" element={<JacPredictor />} />
        <Route path="/percentile2rank" element={<PercentileToRank />} />
      </Routes>
      <Chatbox />

      <Analytics />
      <SpeedInsights />
    </ModalProvider>
  );
}

export default App;