import React from 'react';
import { Link } from 'react-router-dom';
import {
  Target, Filter, MapPin, BarChart3,
  GraduationCap, ArrowRight, BookOpen,
  Trophy, Users, TrendingUp, Lightbulb,
  CheckCircle2, Compass
} from 'lucide-react';
import { useModal } from '../context/ModalContext'
export default function About() {
  const { openModal } = useModal();
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-20">

      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-12 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-600 mb-6 uppercase tracking-wider">
            <BookOpen size={14} /> Comprehensive Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            <span className="text-indigo-600">Percentile to College & Rank</span> Guide
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Understand how percentile converts to rank and how that rank maps to likely college options across counselling rounds.
          </p>
        </div>
      </section>

      {/* 2. HOW TO USE */}
      <section className="py-16 container mx-auto px-4 border-b border-slate-200">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800">How to Use the Predictor</h2>
          <p className="text-slate-500 mt-2">Get your dream college in 4 simple steps</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { icon: <Target className="text-indigo-600" />, title: "Enter Percentile", desc: "Input your JEE Main percentile or rank accurately." },
            { icon: <Users className="text-pink-600" />, title: "Select Category", desc: "Choose General, OBC, SC, ST, or EWS for precise quotas." },
            { icon: <MapPin className="text-orange-600" />, title: "Home State", desc: "Select your state to avail Home State (HS) quota benefits." },
            { icon: <BarChart3 className="text-emerald-600" />, title: "Get Results", desc: "Instant list of colleges & branches you are eligible for." },
          ].map((step, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-center group">
              <div className="w-14 h-14 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. RANK ANALYSIS (Cards) */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-2">
              <Trophy className="text-yellow-500" /> College Predictions by Rank
            </h2>
            <p className="text-slate-500 mt-2">What can you expect with your rank?</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

            {/* 0 - 10k */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:border-indigo-300 transition-all relative overflow-hidden">
              <span className="absolute top-0 right-0 bg-emerald-100 text-emerald-700 px-4 py-1 rounded-bl-2xl text-xs font-bold uppercase">Top 10,000</span>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Elite Tier</h3>
              <ul className="text-sm text-slate-600 space-y-2 mb-4">
                <li><strong className="text-slate-800">NIT Trichy, Warangal, Surathkal:</strong> CSE, ECE</li>
                <li><strong className="text-slate-800">NIT Rourkela, Calicut:</strong> CSE, ECE</li>
                <li><strong className="text-slate-800">IIIT Hyderabad, Bangalore:</strong> CSE</li>
              </ul>
              <div className="bg-slate-50 p-3 rounded-lg text-xs font-medium text-slate-500">
                Options: Computer Science, Electronics, Mechanical
              </div>
            </div>

            {/* 10k - 25k */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:border-indigo-300 transition-all relative overflow-hidden">
              <span className="absolute top-0 right-0 bg-indigo-100 text-indigo-700 px-4 py-1 rounded-bl-2xl text-xs font-bold uppercase">10k - 25k</span>
              <h3 className="text-xl font-bold text-slate-900 mb-4">High Tier</h3>
              <ul className="text-sm text-slate-600 space-y-2 mb-4">
                <li><strong className="text-slate-800">Top NITs:</strong> Civil, Chemical, Metallurgy</li>
                <li><strong className="text-slate-800">NIT Rourkela:</strong> All except CSE</li>
                <li><strong className="text-slate-800">IIIT Allahabad:</strong> ECE, IT</li>
                <li><strong className="text-slate-800">NIT Kurukshetra:</strong> CSE, ECE</li>
              </ul>
              <div className="bg-slate-50 p-3 rounded-lg text-xs font-medium text-slate-500">
                Options: ECE, Mechanical, Civil, Chemical, IT
              </div>
            </div>

            {/* 25k - 50k */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:border-indigo-300 transition-all relative overflow-hidden">
              <span className="absolute top-0 right-0 bg-orange-100 text-orange-700 px-4 py-1 rounded-bl-2xl text-xs font-bold uppercase">25k - 50k</span>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Mid Tier</h3>
              <ul className="text-sm text-slate-600 space-y-2 mb-4">
                <li><strong className="text-slate-800">NIT Bhopal, Jaipur, Patna:</strong> CSE, ECE</li>
                <li><strong className="text-slate-800">NIT Silchar, Hamirpur:</strong> All Branches</li>
                <li><strong className="text-slate-800">IIITDM Kancheepuram:</strong> CSE, ECE</li>
              </ul>
              <div className="bg-slate-50 p-3 rounded-lg text-xs font-medium text-slate-500">
                Options: Most engineering branches available
              </div>
            </div>

            {/* 50k - 100k */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:border-indigo-300 transition-all relative overflow-hidden">
              <span className="absolute top-0 right-0 bg-blue-100 text-blue-700 px-4 py-1 rounded-bl-2xl text-xs font-bold uppercase">50k - 1L</span>
              <h3 className="text-xl font-bold text-slate-900 mb-4">New NITs & GFTIs</h3>
              <ul className="text-sm text-slate-600 space-y-2 mb-4">
                <li><strong className="text-slate-800">NIT Agartala, Srinagar:</strong> All Branches</li>
                <li><strong className="text-slate-800">NIT Sikkim, Manipur:</strong> All Branches</li>
                <li><strong className="text-slate-800">NIT Goa:</strong> Lower preference branches</li>
              </ul>
              <div className="bg-slate-50 p-3 rounded-lg text-xs font-medium text-slate-500">
                Options: Core branches & GFTIs
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CATEGORY & STATS GRID */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

            {/* LEFT: Category Wise */}
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Users className="text-indigo-600" /> Category-wise Trends
              </h3>
              <div className="space-y-4">
                {[
                  { cat: "General", range: "< 25k (Top NITs), < 75k (Mid)" },
                  { cat: "OBC", range: "< 75k (Top NITs), < 2L (Mid)" },
                  { cat: "SC", range: "< 1.5L (Top NITs), < 4L (Mid)" },
                  { cat: "ST", range: "Available in most NITs (High Probability)" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg">{item.cat}</span>
                    <span className="text-sm font-medium text-slate-600 text-right">{item.range}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Percentile to Rank */}
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <TrendingUp className="text-emerald-600" /> Percentile vs Rank
              </h3>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-100 text-slate-700 font-bold">
                    <tr>
                      <th className="px-6 py-3">Percentile</th>
                      <th className="px-6 py-3">Approx Rank</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {[
                      { p: "99.5+", r: "Top 5,000" },
                      { p: "99.0", r: "~ 20,000" },
                      { p: "98.0", r: "~ 50,000" },
                      { p: "97.0", r: "~ 80,000" },
                      { p: "95.0", r: "~ 1,50,000" },
                      { p: "93.0", r: "~ 2,20,000" },
                    ].map((row, j) => (
                      <tr key={j}>
                        <td className="px-6 py-3 font-medium text-slate-800">{row.p}</td>
                        <td className="px-6 py-3 text-slate-500">{row.r}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. STATE & BRANCH ANALYSIS */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">

            {/* State Quota */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <MapPin className="text-orange-600" /> Home State Quota (HS)
              </h3>
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Uttar Pradesh (UP)</h4>
                  <p className="text-xs text-slate-500">MNNIT Allahabad CSE &lt; 60k | NIT Jalandhar CSE &lt; 1.2L</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Madhya Pradesh (MP)</h4>
                  <p className="text-xs text-slate-500">MANIT Bhopal CSE &lt; 50k | IIITDM Jabalpur CSE &lt; 90k</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Tamil Nadu (TN)</h4>
                  <p className="text-xs text-slate-500">NIT Trichy CSE &lt; 15k | High competition hub</p>
                </div>
              </div>
            </div>

            {/* Branch Analysis */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Compass className="text-blue-600" /> Branch Wise Cutoffs
              </h3>
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 border-l-4 border-l-blue-500">
                  <h4 className="font-bold text-slate-900 mb-1">Computer Science (CSE)</h4>
                  <p className="text-xs text-slate-500">Top NITs &lt; 15k | Mid NITs &lt; 40k | New NITs &lt; 80k</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 border-l-4 border-l-emerald-500">
                  <h4 className="font-bold text-slate-900 mb-1">Electronics (ECE)</h4>
                  <p className="text-xs text-slate-500">Top NITs &lt; 25k | Mid NITs &lt; 60k | New NITs &lt; 1L</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 border-l-4 border-l-amber-500">
                  <h4 className="font-bold text-slate-900 mb-1">Mechanical Engineering</h4>
                  <p className="text-xs text-slate-500">Top NITs &lt; 35k | Mid NITs &lt; 80k | New NITs &lt; 1.5L</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. TIPS & CTA */}
      <section className="container mx-auto px-4 mt-16 pb-12 text-center">
        <div className="bg-indigo-600 rounded-3xl p-12 text-white shadow-2xl shadow-indigo-200 max-w-4xl mx-auto relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
              <Lightbulb className="text-yellow-300" /> Improvement Tips
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-left text-indigo-100 text-sm mb-8 max-w-2xl mx-auto">
              <div className="flex gap-2"><CheckCircle2 size={16} className="shrink-0" /> Consider Home State Quota benefits</div>
              <div className="flex gap-2"><CheckCircle2 size={16} className="shrink-0" /> Research newer NITs for better branch options</div>
              <div className="flex gap-2"><CheckCircle2 size={16} className="shrink-0" /> Be flexible with branch vs college reputation</div>
              <div className="flex gap-2"><CheckCircle2 size={16} className="shrink-0" /> Check placement stats before deciding</div>
            </div>

            {/* <Link
              to="/predict"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-lg active:scale-95"
            >
              Start Predicting Now <ArrowRight size={20} />
            </Link> */}
            <button
              onClick={openModal}
              className="bg-yellow-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center gap-2 hover:-translate-y-1"
            >
              Start Predictor <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 font-medium">© 2026 Rank2College. Built for students, by students.</p>
          <p className="text-xs text-slate-400 mt-2">Disclaimer: Predictions are estimates based on past cutoffs and trends. Official counselling results may differ. Always verify with official counselling portals.</p>
          <p className="text-slate-500 font-medium">Not affiliated with NTA, JEE Main, or JEE Advanced. For official information, visit NTA JEE.</p>
        </div>
      </footer>

    </div>
  );
}