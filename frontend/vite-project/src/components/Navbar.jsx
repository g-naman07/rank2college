import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { useModal } from '../context/ModalContext'; // Import Hook

export default function Navbar() {
  const { openModal } = useModal(); // Get the function

  return (
    <div className="fixed top-6 left-0 right-0 z-50 w-full pointer-events-none">
      <div className="flex justify-between items-center w-full px-6 md:px-12 pointer-events-auto">

        {/* 1. LEFT PILL: LOGO */}
        <Link
          to="/"
          className="bg-slate-900 text-white rounded-full p-1.5 pr-6 flex items-center gap-3 shadow-xl hover:scale-105 transition-transform"
        >
          <div className="bg-indigo-500 rounded-full p-2 text-white">
            <GraduationCap size={20} />
          </div>
          <span className="font-bold tracking-wide text-sm hidden sm:block">Rank2College</span>
        </Link>

        {/* 2. CENTER PILL: LINKS */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
          <nav className="bg-white/80 backdrop-blur-md border border-slate-200/60 px-8 py-3.5 rounded-full shadow-2xl shadow-slate-200/50 flex gap-8 text-xs font-extrabold tracking-widest text-slate-500 uppercase">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <Link to="/percentile2rank" className="hover:text-indigo-600 transition-colors">Percentile To Rank</Link>
            <Link to="/josaa/predict" className="hover:text-indigo-600 transition-colors">JOSAA PREDICTOR</Link>
            <Link to="/jac/predict" className="hover:text-indigo-600 transition-colors">JAC PREDICTOR</Link>

            {/* <a href="#about" className="hover:text-indigo-600 transition-colors">About Us</a> */}
            {/* <a href="#faq" className="hover:text-indigo-600 transition-colors">FAQ</a> */}
            <Link to="/about" className="hover:text-indigo-600 transition-colors">About The tool</Link>
          </nav>
        </div>

        {/* 3. RIGHT PILL: CTA (NOW OPENS MODAL) */}
        <button
          onClick={openModal}
          className="bg-slate-900 text-white px-6 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-indigo-900 transition-all shadow-xl hover:scale-105 flex items-center gap-2"
        >
          Predict Now <ArrowRight size={14} />
        </button>

      </div>
    </div>
  );
}