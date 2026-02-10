import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Globe, X } from 'lucide-react';

export default function CounsellingSelector({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Backdrop: Clicking outside closes it */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Close Button (X) */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-2">Choose Counselling</h2>
        <p className="text-slate-500 text-center mb-8">Select the admission process you are applying for.</p>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* OPTION 1: JOSAA */}
          {/* 👇 ADDED onClick={onClose} HERE */}
          <Link 
            to="/josaa/predict" 
            onClick={onClose} 
            className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all text-center"
          >
            <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
              <img src="/logos/josaa.png" alt="JOSAA" className="h-8 w-auto" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">JOSAA (All India)</h3>
            <p className="text-sm text-slate-500">For IITs, NITs, IIITs & GFTIs based on JEE Mains & Advanced.</p>
          </Link>

          {/* OPTION 2: JAC DELHI */}
          {/* 👇 ADDED onClick={onClose} HERE */}
          <Link 
            to="/jac/predict" 
            onClick={onClose}
            className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-orange-600 hover:bg-orange-50 transition-all text-center"
          >
            <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
              <img src="/logos/jac.png" alt="JAC Delhi" className="h-8 w-auto" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">JAC Delhi</h3>
            <p className="text-sm text-slate-500">For DTU, NSUT, IIIT-D & IGDTUW. (Delhi & Outside Delhi Quota)</p>
          </Link>

        </div>
      </div>
    </div>
  );
}