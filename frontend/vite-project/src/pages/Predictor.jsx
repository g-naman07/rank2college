import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, MapPin, Building2, User, BookOpen, Loader2, Trophy, Calculator, CheckCircle2, AlertCircle, XCircle, GraduationCap } from 'lucide-react';

const CATEGORIES = ['OPEN', 'OBC-NCL', 'EWS', 'SC', 'ST'];
const QUOTAS = ['AI', 'HS', 'OS'];
const INSTITUTE_TYPES = ['IIT', 'NIT', 'IIIT', 'GFTI'];
const GENDERS = ['Gender-Neutral', 'Female-only (including Supernumerary)']
export default function Predictor() {
  const [form, setForm] = useState({
    rank: '',
    marks: '',
    category: '',
    quota: '',
    gender: '',
    instituteType: '',
    branchSearch: ''
  });

  // New State for Exam Mode
  const [examMode, setExamMode] = useState('JEE_MAINS'); // 'JEE_MAINS' or 'JEE_ADVANCED'
  const [searchMode, setSearchMode] = useState('rank');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

  // --- EFFECT: Handle Exam Mode Switching ---
  useEffect(() => {
    if (examMode === 'JEE_ADVANCED') {
      // If Advanced: Force Rank Mode (no marks prediction) & Reset Institute
      setSearchMode('rank');
      setForm(prev => ({ ...prev, instituteType: 'IIT', quota: 'AI' })); // IITs are usually All India
    } else {
      // If Mains: Reset to default
      setForm(prev => ({ ...prev, instituteType: '' }));
    }
    setResults(null); // Clear old results
  }, [examMode]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);

    try {
      const payload = {
        examMode,
        ...(form.category && { category: form.category }),
        ...(form.quota && { quota: form.quota }),
        ...(form.gender && { gender: form.gender }),
        rank: searchMode === 'rank' ? Number(form.rank) : undefined,
        marks: searchMode === 'marks' ? Number(form.marks) : undefined,
      };


      const res = await fetch(`${apiBase}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }
      setResults(data);
    } catch (err) {
      alert("Failed to fetch. Is backend running?");
    } finally {
      setLoading(false);
    }
  };
  const handleExportPDF = async () => {
  try {
    const payload = {
      examMode,
      ...(form.category && { category: form.category }),
      ...(form.quota && { quota: form.quota }),
      ...(form.gender && { gender: form.gender }),
      rank: searchMode === 'rank' ? Number(form.rank) : undefined,
      marks: searchMode === 'marks' ? Number(form.marks) : undefined,
    };

    const res = await fetch(`${apiBase}/predict/pdf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('PDF generation failed');

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'college-prediction.pdf';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    alert('Failed to export PDF');
  }
};


  // --- CLIENT FILTERING ---
  const filteredData = useMemo(() => {
    if (!results?.data) return [];
    return results.data.filter(college => {
      // Institute Type Filter
      if (form.instituteType) {
        const name = college.institute;
        const type = form.instituteType;
        let match = true;
        if (type === 'IIT') match = name.includes('Indian Institute of Technology');
        else if (type === 'NIT') match = name.includes('National Institute of Technology');
        else if (type === 'IIIT') match = name.includes('Indian Institute of Information Technology');
        if (!match) return false;
      }
      // Branch Filter
      if (form.branchSearch) {
        if (!college.program.toLowerCase().includes(form.branchSearch.toLowerCase())) {
          return false;
        }
      }
      return true;
    });
  }, [results, form.instituteType, form.branchSearch]);

  const getProbability = (closingRank, userRank) => {
    if (!userRank) return { text: "Safe", color: "emerald", icon: CheckCircle2 };
    const diff = closingRank - userRank;
    if (diff > 2000) return { text: "Safe", color: "emerald", icon: CheckCircle2 };
    if (diff > 500) return { text: "Likely", color: "blue", icon: CheckCircle2 };
    if (diff > 0) return { text: "Borderline", color: "amber", icon: AlertCircle };
    return { text: "Ambitious", color: "rose", icon: XCircle };
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden text-slate-900 relative selection:bg-indigo-100 selection:text-indigo-900">

      {/* Backgrounds */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none fixed"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-[96px] opacity-70 animate-blob pointer-events-none fixed"></div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10 pt-40 pb-6 h-full">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT: CONTROLS */}
          <div className="lg:col-span-4 h-[calc(100vh-10rem)] overflow-y-auto pr-2">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sticky top-28">

              {/* EXAM TOGGLE (NEW) */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Exam</label>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setExamMode('JEE_MAINS')}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${examMode === 'JEE_MAINS' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    JEE Mains
                  </button>
                  <button
                    onClick={() => setExamMode('JEE_ADVANCED')}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${examMode === 'JEE_ADVANCED' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    JEE Advanced
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Rank/Marks Toggle */}
                <div className={`bg-slate-100 p-1.5 rounded-xl flex relative ${examMode === 'JEE_ADVANCED' ? 'opacity-50 pointer-events-none' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setSearchMode('rank')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 z-10 ${searchMode === 'rank' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    <Trophy size={16} /> Rank
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchMode('marks')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 z-10 ${searchMode === 'marks' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    <Calculator size={16} /> Marks
                  </button>
                </div>
                {examMode === 'JEE_ADVANCED' && <p className="text-xs text-center text-slate-400 -mt-3">Marks prediction unavailable for Advanced</p>}

                {/* Input */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    {searchMode === 'rank' ? `${examMode === 'JEE_ADVANCED' ? 'Advanced' : 'Mains'} Rank` : 'Mains Marks'}
                  </label>
                  <input
                    type="number"
                    name={searchMode}
                    value={form[searchMode]}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 15000"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-900"
                  />
                </div>
                {/* Gender */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none font-medium text-slate-700"
                  >
                    <option value="">All Genders</option>
                    {GENDERS.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                {/* Dropdowns */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                    <select name="category" value={form.category} onChange={handleChange} className="w-full px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none font-medium text-slate-700">
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Quota</label>
                    <select name="quota" value={form.quota} onChange={handleChange} className="w-full px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none font-medium text-slate-700">
                      {QUOTAS.map(q => <option key={q} value={q}>{q}</option>)}
                    </select>
                  </div>
                </div>

                {/* Institute Type (Dynamic) */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Institute Type</label>
                  <select
                    name="instituteType"
                    value={form.instituteType}
                    onChange={handleChange}
                    disabled={examMode === 'JEE_ADVANCED'} // Lock for Advanced
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none font-medium text-slate-700 ${examMode === 'JEE_ADVANCED' ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    <option value="">All Institutes</option>
                    {INSTITUTE_TYPES.map(t => (
                      // Hide IIT if Mains, Show only IIT if Advanced
                      <option
                        key={t}
                        value={t}
                        disabled={(examMode === 'JEE_MAINS' && t === 'IIT') || (examMode === 'JEE_ADVANCED' && t !== 'IIT')}
                        hidden={(examMode === 'JEE_MAINS' && t === 'IIT') || (examMode === 'JEE_ADVANCED' && t !== 'IIT')}
                      >
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Branch */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Branch</label>
                  <input
                    type="text"
                    name="branchSearch"
                    value={form.branchSearch}
                    onChange={handleChange}
                    placeholder="e.g. Computer, Electrical"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-95"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <><Search size={20} /> Find Colleges</>}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: RESULTS (Same as before) */}
          <div className="lg:col-span-8 h-[calc(100vh-10rem)] overflow-y-auto px-4">
            {!results ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[500px] border-2 border-dashed border-slate-200 rounded-3xl bg-white/50">
                <Search size={48} className="mb-4 opacity-20" />
                <h3 className="text-lg font-bold">No Search Yet</h3>
                <p>Select {examMode === 'JEE_ADVANCED' ? 'Advanced' : 'Mains'} mode to start.</p>
              </div>
            ) : (
              < div className="space-y-6">
                <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
  <div>
    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
      Found{' '}
      <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md">
        {filteredData.length}
      </span>
      {' '} / {results.data.length} Colleges
    </h3>

    <p className="text-sm text-slate-500 mt-1">
      Showing results for {examMode === 'JEE_ADVANCED' ? 'JEE Advanced' : 'JEE Mains'}
    </p>
  </div>

  {/* ✅ ADD THIS BUTTON */}
  <button
    onClick={handleExportPDF}
    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold"
  >
    Export PDF
  </button>
</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      Found{' '}
                      <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md">
                        {filteredData.length}
                      </span>
                      {' '} / {results.data.length} Colleges
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Showing results for {examMode === 'JEE_ADVANCED' ? 'JEE Advanced' : 'JEE Mains'}
                    </p>
                  </div>
                  {results.predictedRank && (
                    <div className="text-right bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Est. Rank</span>
                      <p className="text-2xl font-bold text-emerald-700">#{results.predictedRank}</p>
                    </div>
                  )}
                

                {/* RESULT CARDS LOOP (Same as previous) */}
                <div className="grid gap-4">
                  {filteredData.length === 0 ? (
                    <div className="text-center py-10 text-slate-500">No colleges found. Try adjusting filters.</div>
                  ) : (
                    filteredData.map((college) => {
                      const userRank = results.predictedRank || Number(form.rank);
                      const prob = getProbability(college.closingRank, userRank);
                      const Icon = prob.icon;

                      return (
                        <div key={college.id} className="group relative bg-white rounded-2xl border border-slate-200 p-0 hover:border-indigo-500 transition-all shadow-sm hover:shadow-xl overflow-hidden">
                          <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${prob.color === 'emerald' ? 'bg-emerald-500' : prob.color === 'blue' ? 'bg-blue-500' : prob.color === 'amber' ? 'bg-amber-500' : 'bg-rose-500'}`}></div>
                          <div className="p-6 pl-8 flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                              <div className="flex justify-between items-start gap-4">
                                <h4 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                                  {college.institute}
                                </h4>
                                <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${prob.color === 'emerald' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : prob.color === 'blue' ? 'bg-blue-50 text-blue-700 border-blue-200' : prob.color === 'amber' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                                  <Icon size={12} /> {prob.text}
                                </span>
                              </div>
                              <div className="mt-3 flex items-center gap-2 text-slate-600 font-medium text-sm">
                                <span className="p-1.5 rounded-md bg-slate-100 text-indigo-600"><BookOpen size={16} /></span>
                                {college.program}
                              </div>
                              <div className="flex gap-3 mt-5">
                                <span className="text-xs font-bold px-2 py-1 rounded border border-slate-200 text-slate-500 bg-slate-50">{college.quota}</span>
                                <span className="text-xs font-bold px-2 py-1 rounded border border-slate-200 text-slate-500 bg-slate-50">{college.category}</span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-3 min-w-[150px]">
                              <div className="text-right p-3 rounded-xl bg-slate-50 border border-slate-100">
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Closing Rank</p>
                                <p className="text-2xl font-black text-indigo-600">#{college.closingRank}</p>
                              </div>
                              {userRank && (
                                <div className="text-right">
                                  <div className="flex justify-between text-[10px] text-slate-400 mb-1"><span>Your Rank</span><span>{userRank}</span></div>
                                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${prob.color === 'emerald' ? 'bg-emerald-500' : prob.color === 'blue' ? 'bg-blue-500' : prob.color === 'amber' ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${Math.min(100, (userRank / college.closingRank) * 100)}%` }}></div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}