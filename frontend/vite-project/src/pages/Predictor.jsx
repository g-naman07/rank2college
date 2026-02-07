import React, { useState } from 'react';
import { Search, Filter, MapPin, Building2, User, BookOpen, Loader2, Trophy, Calculator, GraduationCap } from 'lucide-react';

const CATEGORIES = ['OPEN', 'OBC-NCL', 'EWS', 'SC', 'ST'];
const QUOTAS = ['AI', 'HS', 'OS'];
const INSTITUTE_TYPES = ['IIT', 'NIT', 'IIIT', 'GFTI'];

export default function Predictor() {
  // --- LOGIC (Preserved) ---
  const [form, setForm] = useState({
    rank: '',
    marks: '',
    category: 'OPEN',
    quota: 'OS',
    gender: 'Gender-Neutral',
    instituteType: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [searchMode, setSearchMode] = useState('rank'); 

  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);

    try {
      const payload = {
        category: form.category,
        quota: form.quota,
        gender: form.gender,
        rank: searchMode === 'rank' ? Number(form.rank) : undefined,
        marks: searchMode === 'marks' ? Number(form.marks) : undefined,
      };

      const res = await fetch(`${apiBase}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (data.success && data.data) {
        if (form.instituteType) {
          const type = form.instituteType;
          data.data = data.data.filter(c => {
             const name = c.institute;
             if (type === 'IIT') return name.includes('Indian Institute of Technology');
             if (type === 'NIT') return name.includes('National Institute of Technology');
             if (type === 'IIIT') return name.includes('Indian Institute of Information Technology');
             return true;
          });
        }
        data.count = data.data.length;
      }
      setResults(data);
    } catch (err) {
      alert("Failed to fetch. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Added pt-32 to account for the fixed Navbar
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: CONTROL PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sticky top-28">
              <div className="mb-6 pb-6 border-b border-slate-100">
                <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                  <Filter className="text-indigo-600" size={20} /> Filter Criteria
                </h2>
                <p className="text-slate-500 text-sm mt-1 ml-7">Refine your college search</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Toggle Switch */}
                <div className="bg-slate-100 p-1.5 rounded-xl flex relative">
                  <button
                    type="button"
                    onClick={() => setSearchMode('rank')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 z-10 ${searchMode === 'rank' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <Trophy size={16}/> Rank
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchMode('marks')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 z-10 ${searchMode === 'marks' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <Calculator size={16}/> Marks
                  </button>
                </div>

                {/* Dynamic Input */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    {searchMode === 'rank' ? 'JEE Mains Rank' : 'Expected Marks (out of 300)'}
                  </label>
                  <input
                    type="number"
                    name={searchMode}
                    value={form[searchMode]}
                    onChange={handleChange}
                    required
                    placeholder={searchMode === 'rank' ? "e.g. 15000" : "e.g. 180"}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                {/* Dropdowns Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                    <div className="relative">
                      <select name="category" value={form.category} onChange={handleChange} className="w-full pl-3 pr-8 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none font-medium text-slate-700 cursor-pointer">
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <User className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" size={16} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Quota</label>
                    <div className="relative">
                      <select name="quota" value={form.quota} onChange={handleChange} className="w-full pl-3 pr-8 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none font-medium text-slate-700 cursor-pointer">
                        {QUOTAS.map(q => <option key={q} value={q}>{q}</option>)}
                      </select>
                      <MapPin className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" size={16} />
                    </div>
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Institute Type</label>
                   <div className="relative">
                     <select name="instituteType" value={form.instituteType} onChange={handleChange} className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none font-medium text-slate-700 cursor-pointer">
                        <option value="">All Institutes</option>
                        {INSTITUTE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                     </select>
                     <Building2 className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" size={16} />
                   </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all flex items-center justify-center gap-2 transform active:scale-95"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <><Search size={20} /> Find Colleges</>}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: RESULTS */}
          <div className="lg:col-span-8">
            {!results ? (
              // EMPTY STATE
              <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[500px] border-2 border-dashed border-slate-200 rounded-3xl bg-white/50">
                <div className="bg-slate-100 p-6 rounded-full mb-4">
                  <Search size={48} className="text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-600">No Search Yet</h3>
                <p className="text-slate-400">Enter your rank or marks to see predictions</p>
              </div>
            ) : (
              // RESULTS LIST
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                   <div>
                      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        Found <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md">{results.count}</span> Colleges
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">Based on 2024-2025 Cutoff Trends</p>
                   </div>
                   {results.predictedRank && (
                     <div className="text-right bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Est. Rank</span>
                        <p className="text-2xl font-bold text-emerald-700">#{results.predictedRank}</p>
                     </div>
                   )}
                </div>

                <div className="grid gap-4">
                  {results.data.map((college) => (
                    <div key={college.id} className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all duration-300">
                      <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                        
                        {/* College Info */}
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            <div className="bg-slate-50 p-3 rounded-xl text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                              <GraduationCap size={24} />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors">
                                {college.institute}
                              </h4>
                              <div className="flex items-center gap-2 text-slate-500 font-medium mt-2 text-sm">
                                 <BookOpen size={16} className="text-slate-400"/> 
                                 {college.program}
                              </div>
                            </div>
                          </div>

                          {/* Badges */}
                          <div className="flex gap-2 mt-5 ml-14">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 text-slate-600 text-xs font-bold border border-slate-100">
                              <MapPin size={12}/> {college.quota}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 text-slate-600 text-xs font-bold border border-slate-100">
                              <User size={12}/> {college.category}
                            </span>
                          </div>
                        </div>

                        {/* Rank Stats */}
                        <div className="flex gap-4 w-full md:w-auto mt-4 md:mt-0">
                          <div className="text-right bg-slate-50 p-4 rounded-xl min-w-[120px] border border-slate-100 flex-1 md:flex-none">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Closing Rank</p>
                            <p className="text-xl font-extrabold text-indigo-600">#{college.closingRank}</p>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}