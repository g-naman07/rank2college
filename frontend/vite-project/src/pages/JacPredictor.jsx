import React, { useState } from 'react';
import { Search, MapPin, Building2, User, BookOpen, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';

// JAC Constants
const CATEGORIES = ['OPEN', 'EWS', 'OBC-NCL', 'SC', 'ST'];
const REGIONS = [
  { value: 'HS', label: 'Delhi Region (Candidate from Delhi)' },
  { value: 'OS', label: 'Outside Delhi (All India)' }
];
const GENDERS = [
  'Gender-Neutral',
  'Female-only'
];

export default function JacPredictor() {
  const [form, setForm] = useState({
    rank: '',
    category: 'OPEN',
    quota: 'HS', // Default to Delhi
    gender: 'Gender-Neutral'
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVisibleCount(6);

    try {
      const payload = {
        counselling: 'JAC',
        examMode: 'JEE_MAINS', 
        ...form,
        rank: Number(form.rank)
      };

      const res = await fetch('http://localhost:5001/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50/30 overflow-hidden">
      <Navbar />

      <div className="w-full px-6 xl:px-10 pt-40 pb-6 h-full">

        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/logos/jac.png" alt="JAC Delhi Counselling" className="h-10 w-auto" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Percentile to College & Rank</h1>
          <p className="text-slate-600">JAC Delhi predictor for DTU, NSUT, IIIT-Delhi, and IGDTUW.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT: FORM */}
          <div className="lg:col-span-3 h-[calc(100vh-10rem)] overflow-y-auto pr-2">
            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-orange-100/50 border border-orange-100 sticky top-28">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Rank */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">JEE Mains Rank (CRL)</label>
                  <input
                    type="number"
                    value={form.rank}
                    onChange={(e) => setForm({ ...form, rank: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none font-bold"
                    placeholder="e.g. 15000"
                    required
                  />
                </div>

                {/* Region (Quota) */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Region</label>
                  <div className="flex flex-col gap-3">
                    {REGIONS.map((r) => (
                      <label key={r.value} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${form.quota === r.value ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-white border-slate-200 text-slate-600'}`}>
                        <input
                          type="radio"
                          name="quota"
                          value={r.value}
                          checked={form.quota === r.value}
                          onChange={(e) => setForm({ ...form, quota: e.target.value })}
                          className="hidden"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.quota === r.value ? 'border-orange-600' : 'border-slate-300'}`}>
                          {form.quota === r.value && <div className="w-2.5 h-2.5 bg-orange-600 rounded-full" />}
                        </div>
                        <span className="text-sm font-bold">{r.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Gender */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none font-medium text-slate-700"
                  >
                    {GENDERS.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none font-medium"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Predict JAC Colleges"}
                </button>

              </form>
            </div>
          </div>

          {/* RIGHT: RESULTS */}
          <div className="lg:col-span-9 h-[calc(100vh-10rem)] overflow-y-auto px-6 xl:px-8">
            
            {/* Empty State */}
            {!results ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[500px] border-2 border-dashed border-orange-200 rounded-3xl bg-white/70 px-6">
                <img src="/logos/jac.png" alt="JAC Delhi Counselling" className="h-12 w-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-700">Predict JAC Colleges</h3>
                <p className="text-sm text-slate-500 mt-1 text-center">Enter your details to estimate JAC Delhi colleges.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Header showing total found */}
                <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    Found <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-md">{results.data.length}</span> Colleges
                  </h3>
                </div>

                {/* Results Mapping */}
                {results.data.slice(0, visibleCount).map((college) => (
                  <div
                    key={college.id}
                    className="group relative bg-white rounded-2xl border border-slate-200 hover:border-orange-400 transition-all shadow-sm hover:shadow-lg mb-4 overflow-hidden"
                  >
                    {/* 👇 CHANGED: Solid orange accent bar instead of rainbow */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500"></div>

                    <div className="p-6 pl-8 flex justify-between gap-6">
                      {/* LEFT CONTENT */}
                      <div className="flex-1">
                        {/* 👇 CHANGED: Indigo text to Orange text for college name */}
                        <h3 className="text-lg font-bold text-orange-700 group-hover:text-orange-800 transition-colors">
                          {college.institute}
                        </h3>

                        <div className="mt-2 text-slate-600 font-medium text-sm">
                          {college.program}
                        </div>

                        {/* TAGS */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {/* 👇 CHANGED: Tag colors adjusted to fit the theme better */}
                          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-orange-50 text-orange-700 border border-orange-100">
                            {college.quota === 'HS' ? 'Delhi Region' : 'Outside Delhi'}
                          </span>

                          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            {college.category}
                          </span>

                          {college.gender && (
                            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
                              {college.gender}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* RIGHT – RANK BOX */}
                      <div className="min-w-[160px] text-right">
                        {/* 👇 CHANGED: Rank box from indigo to orange */}
                        <div className="rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 px-4 py-3">
                          <p className="text-[10px] uppercase font-bold text-orange-500 tracking-wider">
                            Closing Rank
                          </p>
                          <p className="text-2xl font-black text-orange-700">
                            #{college.closingRank}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}

                {/* Load More Button */}
                {visibleCount < results.data.length && (
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="w-full mt-6 py-4 rounded-xl font-bold text-orange-600 bg-orange-50 border-2 border-dashed border-orange-200 hover:bg-orange-100 hover:border-orange-300 transition-all flex items-center justify-center gap-2"
                  >
                    Load More Colleges ({results.data.length - visibleCount} remaining)
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
      
    </div>
  );
}