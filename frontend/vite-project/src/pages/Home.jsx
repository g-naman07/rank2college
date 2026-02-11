import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Database, Zap } from 'lucide-react'
import { useModal } from '../context/ModalContext' // Import Global Context

import Aboutus from './About'

// 👇 1. IMPORT THE NEW CAROUSEL COMPONENT
import LogoCarousel from '../components/LogoCarousel';

export default function Home() {
  const [marks, setMarks] = useState(178)
  const { openModal } = useModal(); // Use Global Context instead of local state

  const getMetrics = (m) => {
    let p = 0
    if (m >= 280) p = 99.99 + (m - 280) * 0.0005
    else if (m >= 250) p = 99.95 + (m - 250) * (0.04 / 30)
    else if (m >= 220) p = 99.80 + (m - 220) * (0.15 / 30)
    else if (m >= 200) p = 99.50 + (m - 200) * (0.30 / 20)
    else if (m >= 175) p = 99.00 + (m - 175) * (0.50 / 25)
    else if (m >= 155) p = 98.00 + (m - 155) * (1.00 / 20)
    else if (m >= 140) p = 96.50 + (m - 140) * (1.50 / 15)
    else if (m >= 125) p = 95.00 + (m - 125) * (1.50 / 15)
    else if (m >= 110) p = 92.50 + (m - 110) * (2.50 / 15)
    else if (m >= 100) p = 90.00 + (m - 100) * (2.50 / 10)
    else if (m >= 80) p = 80.00 + (m - 80) * (10.00 / 20)
    else p = m * (80.00 / 80)
    if (p > 100) p = 100
    const r = Math.floor(((100 - p) * 1400000) / 100)
    return { percentile: p.toFixed(2), rank: r < 1 ? 1 : r }
  }

  const { percentile, rank } = getMetrics(marks)

  return (
      <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">

        {/* 2. HERO SECTION */}
        <section className="relative pt-36 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/50 rounded-full mix-blend-multiply filter blur-[96px] opacity-70 animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-200/50 rounded-full mix-blend-multiply filter blur-[96px] opacity-70 animate-blob delay-1000"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">

              {/* Text Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-600 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  Updated for 2026 Batch
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900">
                  JEE 2026 Percentile to <br />
                  <span className="text-gradient">
                    College & Rank  Tool
                  </span>
                </h1>

                <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                  Use our percentile-first tools to estimate rank ranges and your best-fit colleges across JOSAA and JAC.
                </p>

                <div className="flex items-center justify-center lg:justify-start gap-0 mb-8">
                  <img src="/logos/alliits.jpg" alt="JOSAA Counselling" className="h-15 w-auto" />
                  <img src="/logos/allnits.jpg" alt="JOSAA Counselling" className="h-15 w-auto" />
                  {/* <div className="h-6 w-px bg-slate-200"></div> */}
                  <img src="/logos/dtu.png" alt="JAC Delhi Counselling" className="h-14 w-auto" />
                  <img src="/logos/igdtuw.png" alt="JAC Delhi Counselling" className="h-14 w-auto" />
                  <img src="/logos/nsut.png" alt="JAC Delhi Counselling" className="h-14 w-auto" />
                  <img src="/logos/iiitd.png" alt="JAC Delhi Counselling" className="h-12 w-auto" />
                </div>


                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {/* HERO BUTTON: Uses openModal */}
                  <button
                    onClick={openModal}
                    className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center gap-2 hover:-translate-y-1"
                  >
                    Start Predictor <ArrowRight size={20} />
                  </button>

                  <Link to="/percentile2rank" className="bg-white text-slate-700 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all border border-slate-200 shadow-sm flex items-center gap-2 hover:text-indigo-600">
                    <TrendingUp size={18} /> PERCENTILE TOOL
                  </Link>
                </div>
                <br />
                <div className="flex flex-wrap gap-4">
                  {/* 100% FREE - Green Theme */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-100 shadow-sm text-xs font-medium text-emerald-700">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    100% FREE
                  </div>

                  {/* ACCURATE - Amber/Gold Theme */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-amber-100 shadow-sm text-xs font-medium text-amber-700">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    ACCURATE
                  </div>

                  {/* NO SIGNIN - Indigo Theme (Original) */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-600">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    NO LOGIN REQUIRED
                  </div>

                  {/* NO ADS - Rose/Red Theme */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-rose-100 shadow-sm text-xs font-medium text-rose-700">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                    NO ADS
                  </div>
                </div>
              </div>


              {/* Glass Card Estimator */}
              <div className="flex-1 w-full max-w-md">
                <div className="glass-card p-8 rounded-3xl relative overflow-hidden">

                  <div className="text-center mb-8 relative z-10">
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">Rank Simulator</h3>
                    <p className="text-sm text-slate-500">Drag to estimate instantly</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                      <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1">Percentile</p>
                      <p className="text-3xl font-bold text-slate-800">{percentile}<span className="text-sm text-slate-400">%</span></p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                      <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1">Est. Rank</p>
                      <p className="text-3xl font-bold text-slate-800">{rank.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mb-8 relative z-10">
                    <div className="flex justify-between text-sm font-medium mb-4">
                      <span className="text-slate-600">Marks (Out of 300)</span>
                      <span className="text-white font-bold bg-indigo-600 px-2 py-1 rounded text-xs">{marks}</span>
                    </div>
                    <input
                      min="0" max="300" step="1" type="range"
                      value={marks} onChange={(e) => setMarks(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-3 font-mono">
                      <span>0</span>
                      <span>150</span>
                      <span>300</span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-600 mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    Updated for 2026 Batch
                  </div>
                  {/* CARD BUTTON: Uses openModal */}
                  <button
                    onClick={openModal}
                    className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl text-center transition-all shadow-lg shadow-indigo-200 relative z-10"
                  >
                    Get Detailed Analysis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 👇 3. INSERTED LOGO CAROUSEL HERE */}
        <LogoCarousel />

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">
              JEE Main 2026 College & Rank Prediction Based on Real Cutoff Data
            </h2>

            <p className="text-slate-600 mb-4 leading-relaxed">
              Our JEE Main 2026 percentile to rank and college predictor tool is built using previous years’ JoSAA and JAC Delhi cutoff data.
              Students can estimate their admission chances into top institutes including IITs, NITs, IIITs, and GFTIs based on percentile, rank, or marks.
            </p>

            <p className="text-slate-600 mb-4 leading-relaxed">
              The predictor covers major engineering branches such as Computer Science Engineering (CSE), Electronics & Communication Engineering (ECE),
              Electrical Engineering (EE), Mechanical Engineering (ME), Civil Engineering, and Information Technology (IT).
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4 text-slate-900">
              Institutes Covered Under JoSAA Counselling
            </h3>

            <p className="text-slate-600 mb-4 leading-relaxed">
              Our database includes cutoff trends for leading Indian Institutes of Technology (IITs) such as
              IIT Bombay, IIT Delhi, IIT Madras, IIT Kanpur, IIT Kharagpur, and IIT Roorkee.
              It also includes top National Institutes of Technology (NITs) like NIT Trichy, NIT Surathkal,
              NIT Warangal, NIT Allahabad, and NIT Calicut.
            </p>

            <p className="text-slate-600 mb-4 leading-relaxed">
              Additionally, we include Indian Institutes of Information Technology (IIITs) such as IIIT Hyderabad,
              IIIT Delhi, IIIT Bangalore, and several Government Funded Technical Institutes (GFTIs) participating in JoSAA.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4 text-slate-900">
              JAC Delhi Colleges Covered
            </h3>

            <p className="text-slate-600 leading-relaxed">
              For Delhi-based aspirants, our predictor also includes detailed branch-wise cutoffs for
              Delhi Technological University (DTU), Netaji Subhas University of Technology (NSUT),
              Indira Gandhi Delhi Technical University for Women (IGDTUW), and IIIT Delhi under JAC Delhi counselling.
            </p>
          </div>
        </section>

        {/* 4. STATS BAR */}
        <section className="border-y border-slate-200 bg-white py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
              {[
                { label: "Accuracy", value: "99.2%" },
                { label: "Colleges", value: "6000+" },
                { label: "Students", value: "15k+" },
                { label: "Speed", value: "<100ms" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Aboutus />
        {/* 5. FEATURES */}


        {/* 6. FOOTER */}
        {/* <footer className="border-t border-slate-200 bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 font-medium">© 2026 Rank2College. Built for students, by students.</p>
          <br />
          <p className="text-xs text-slate-400 mt-2">Disclaimer: Predictions are estimates based on past cutoffs and trends. Official counselling results may differ. Always verify with official counselling portals.</p>
          <p className="text-slate-500 font-medium">Not affiliated with NTA, JEE Main, or JEE Advanced. For official information, visit NTA JEE.</p>
        </div>
      </footer> */}
      </div>
    
  )
}