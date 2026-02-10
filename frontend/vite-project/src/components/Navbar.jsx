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
  className="group flex items-center bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
>
  {/* Icon Box - No rounding, solid background */}
  <div className="bg-slate-900 p-3 text-white transition-colors group-hover:bg-emerald-600">
    <GraduationCap size={24} />
  </div>

  {/* Text Box - Straight edges, Bold Uppercase */}
  <div className="px-4 flex flex-col justify-center">
    <span className="text-slate-900 font-black text-xl tracking-tighter uppercase leading-none">
      RANK<span className="text-emerald-600">  2  </span>COLLEGE
    </span>
    <div className="h-[2px] w-full bg-slate-100 mt-1 group-hover:bg-emerald-100 transition-colors"></div>
  </div>
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