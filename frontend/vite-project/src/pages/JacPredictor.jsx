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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        counselling: 'JAC', // <--- THE KEY FLAG
        examMode: 'JEE_MAINS', // JAC is always Mains
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
    <div className="min-h-screen bg-orange-50/30">
      <Navbar />

      <div className="w-full px-6 xl:px-10 pt-40 pb-20">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/logos/jac.png" alt="JAC Delhi Counselling" className="h-10 w-auto" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Percentile to College & Rank</h1>
          <p className="text-slate-600">JAC Delhi predictor for DTU, NSUT, IIIT-Delhi, and IGDTUW.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">


          {/* LEFT: FORM */}
          <div className="lg:col-span-3 h-fit bg-white p-8 rounded-3xl shadow-xl shadow-orange-100/50 border border-orange-100">
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

          {/* RIGHT: RESULTS */}
          <div className="lg:col-span-9">
            {/* Result Mapping Logic Here (Same as JOSAA, just styled Orange) */}
            {/* Use results.data.map... */}
            {!results && (
              <div className="lg:col-span-9 h-[calc(100vh-10rem)] overflow-y-auto px-10 xl:px-19">
                <div className="flex flex-col items-center gap-3 rounded-3xl
                border-2 border-dashed border-orange-200
                bg-white/70 px-10 py-10 w-full max-w-3xl
">

                  <img src="/logos/jac.png" alt="JAC Delhi Counselling" className="h-12 w-auto" />
                  <p className="text-sm text-slate-600">Enter your details to estimate JAC Delhi colleges.</p>
                </div>
              </div>
            )}

            {results?.data?.map((college) => (
              <div
                key={college.id}
                className="group relative bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 transition-all shadow-sm hover:shadow-lg mb-4 overflow-hidden"
              >
                {/* Left Accent Bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 via-amber-500 to-emerald-500"></div>

                <div className="p-6 pl-8 flex justify-between gap-6">

                  {/* LEFT CONTENT */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-indigo-700 group-hover:text-indigo-800 transition-colors">
                      {college.institute}
                    </h3>

                    <div className="mt-2 text-slate-600 font-medium text-sm">
                      {college.program}
                    </div>

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {college.quota === 'HS' ? 'Delhi Region' : 'Outside Delhi'}
                      </span>

                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
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
                    <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 px-4 py-3">
                      <p className="text-[10px] uppercase font-bold text-indigo-500 tracking-wider">
                        Closing Rank
                      </p>
                      <p className="text-2xl font-black text-indigo-700">
                        #{college.closingRank}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            ))}
          </div>

        </div>
      </div>
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 font-medium">© 2026 Rank2College. Built for students, by students.</p>
          <p className="text-xs text-slate-400 mt-2">Disclaimer: Predictions are estimates based on past cutoffs and trends till last round 5. Official counselling results may differ. Always verify with official counselling portals.</p>
           <p className="text-slate-500 font-medium">Not affiliated with NTA, JEE Main, or JEE Advanced. For official information, visit NTA JEE.</p>
        </div>
      </footer>
    </div>
  );
}