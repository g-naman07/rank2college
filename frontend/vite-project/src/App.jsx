import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Predictor from './pages/Predictor';
import PercentileToRank from './pages/PercentileToRank'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Predictor />} />
        <Route path="/percentile2rank" element={<PercentileToRank />} />
      </Routes>
    </div>
  );
}

export default App;