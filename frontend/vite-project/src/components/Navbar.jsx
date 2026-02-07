import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="glass-card rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl shadow-xl shadow-slate-200/50">
        
        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-indigo-600 p-2 rounded-full text-white transform group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-indigo-600/20">
            <GraduationCap size={20} />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-800 group-hover:text-indigo-600 transition-colors">
            Rank2College
          </span>
        </Link>

        {/* Desktop Links - Dark Text for Light Mode */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <Link 
            to="/predict" 
            className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-200"
          >
            Predict Now <ArrowRight size={14} />
          </Link>
        </div>
      </nav>
    </div>
  );
}