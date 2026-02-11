import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Building2, User, BookOpen, Loader2, Trophy, TrendingUp, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

const CATEGORIES = ['OPEN', 'OBC-NCL', 'EWS', 'SC', 'ST'];
const QUOTAS = ['AI', 'HS', 'OS'];
const INSTITUTE_TYPES = ['IIT', 'NIT', 'IIIT', 'GFTI'];
const GENDERS = ['Gender-Neutral', 'Female-only (including Supernumerary)'];

export default function Predictor() {
  const [form, setForm] = useState({
    rank: '',
    percentile: '',
    category: 'OPEN',
    quota: 'AI',
    gender: '',
    instituteType: '',
    branchSearch: ''
  });

  const [examMode, setExamMode] = useState('JEE_MAINS');
  const [searchMode, setSearchMode] = useState('percentile');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  // 👇 ADDED VISIBLE COUNT STATE
  const [visibleCount, setVisibleCount] = useState(6);

  const apiBase = import.meta.env.VITE_API_URL || 'https://rank2college-xy9g.onrender.com/api';

  useEffect(() => {
    if (examMode === 'JEE_ADVANCED') {
      setSearchMode('rank');
      setForm(prev => ({ ...prev, instituteType: 'IIT', quota: 'AI' }));
    } else {
      setSearchMode('percentile');
      setForm(prev => ({ ...prev, instituteType: '' }));
    }
    setResults(null);
  }, [examMode]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resolveRankForRequest = async () => {
    if (searchMode === 'rank') {
      return { rank: Number(form.rank), range: null, percentile: null };
    }

    const response = await fetch(`${apiBase}/percentile2rank`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ percentile: form.percentile, category: form.category })
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'Failed to calculate rank');
    }

    return {
      rank: data.predictedRank,
      range: data.expectedRankRange || null,
      percentile: form.percentile
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    // 👇 RESET VISIBLE COUNT ON NEW SEARCH
    setVisibleCount(6);

    const cleanCategory = form.category === 'All Categories' ? undefined : form.category;
    const cleanQuota = form.quota === 'All Quotas' ? undefined : form.quota;
    const cleanGender = form.gender === 'All Genders' ? undefined : form.gender;
    const cleanInstitute = form.instituteType === 'All Institutes' ? undefined : form.instituteType;

    try {
      const rankInfo = await resolveRankForRequest();

      const payload = {
        examMode,
        counselling: 'JOSAA',
        ...(cleanCategory && { category: cleanCategory }),
        ...(cleanQuota && { quota: cleanQuota }),
        ...(cleanGender && { gender: cleanGender }),
        ...(cleanInstitute && { instituteType: cleanInstitute }),
        rank: rankInfo.rank,
      };

      const res = await fetch(`${apiBase}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "No results found");
        return;
      }
      setResults({
        ...data,
        predictedRank: searchMode === 'percentile' ? rankInfo.rank : data.predictedRank,
        expectedRankRange: searchMode === 'percentile' ? rankInfo.range : data.expectedRankRange,
        predictedPercentile: searchMode === 'percentile' ? rankInfo.percentile : data.predictedPercentile
      });
    } catch (err) {
      console.error(err);
      alert(err?.message || "Failed to fetch. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      const rankInfo = await resolveRankForRequest();
      const payload = {
        examMode,
        ...(form.category && { category: form.category }),
        ...(form.quota && { quota: form.quota }),
        ...(form.gender && { gender: form.gender }),
        rank: rankInfo.rank,
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

  const filteredData = useMemo(() => {
    if (!results?.data) return [];
    return results.data.filter(college => {
      if (form.instituteType) {
        const name = college.institute;
        const type = form.instituteType;
        let match = true;
        if (type === 'IIT') match = name.includes('Indian Institute of Technology');
        else if (type === 'NIT') match = name.includes('National Institute of Technology');
        else if (type === 'IIIT') match = name.includes('Indian Institute of Information Technology');
        if (!match) return false;
      }
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

      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none fixed"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-[96px] opacity-70 animate-blob pointer-events-none fixed"></div>

      <div className="w-full px-6 xl:px-10 relative z-10 pt-40 pb-6 h-full">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/logos/josaa.png" alt="JOSAA Counselling" className="h-10 w-auto" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">JEE MAIN 2026 Percentile to College & Rank</h1>
          <p className="text-slate-600">JOSAA predictor for IITs, NITs, IIITs, and GFTIs.</p>
        </div>
        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT: CONTROLS */}
          <div className="lg:col-span-3 h-[calc(100vh-10rem)] overflow-y-auto pr-2">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sticky top-28">

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
                    onClick={() => setSearchMode('percentile')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 z-10 ${searchMode === 'percentile' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    <TrendingUp size={16} /> Percentile
                  </button>
                </div>
                {examMode === 'JEE_ADVANCED' && <p className="text-xs text-center text-slate-400 -mt-3">Percentile is available only for Mains</p>}

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    {searchMode === 'rank' ? `${examMode === 'JEE_ADVANCED' ? 'Advanced' : 'Mains'} Rank` : 'JEE Mains Percentile'}
                  </label>
                  <input
                    type="number"
                    name={searchMode}
                    value={form[searchMode]}
                    onChange={handleChange}
                    required
                    step={searchMode === 'percentile' ? '0.0000001' : undefined}
                    min={searchMode === 'percentile' ? '0' : undefined}
                    max={searchMode === 'percentile' ? '100' : undefined}
                    placeholder={searchMode === 'percentile' ? 'e.g. 95.5' : 'e.g. 15000'}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-900"
                  />
                </div>

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

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Institute Type</label>
                  <select
                    name="instituteType"
                    value={form.instituteType}
                    onChange={handleChange}
                    disabled={examMode === 'JEE_ADVANCED'}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none font-medium text-slate-700 ${examMode === 'JEE_ADVANCED' ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    <option value="">All Institutes</option>
                    {INSTITUTE_TYPES.map(t => (
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

          {/* RIGHT: RESULTS */}
          <div className="lg:col-span-9 h-[calc(100vh-10rem)] overflow-y-auto px-6 xl:px-8">
            {!results ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[500px] border-2 border-dashed border-slate-200 rounded-3xl bg-white/50 px-6">
                <img src="/logos/josaa.png" alt="JOSAA Counselling" className="h-12 w-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-700">Percentile to College & Rank</h3>
                <p className="text-sm text-slate-500 mt-1 text-center">Estimate your JOSAA chances for IITs, NITs, IIITs, and GFTIs.</p>
                <div className="mt-6 flex items-center gap-4 opacity-80">
                  <img src="/logos/alliits.jpg" alt="IIT" className="h-20 w-auto" />
                  <img src="/logos/allnits.jpg" alt="NIT" className="h-20 w-auto" />
                  <img src="/logos/iiith.jpg" alt="IIIT" className="h-20 w-auto" />
                </div>
                <p className="text-xs text-slate-400 mt-4">Select {examMode === 'JEE_ADVANCED' ? 'Advanced' : 'Mains'} mode to start.</p>
              </div>
            ) : (
              <div className="space-y-6">

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
                  <button
                    onClick={handleExportPDF}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-all active:scale-95"
                  >
                    Export PDF
                  </button>
                </div>

                {results.predictedRank && (
                  <div className="flex justify-end">
                    <div className="text-right bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 inline-block">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Est. Rank</span>
                      <p className="text-2xl font-bold text-emerald-700">#{results.predictedRank}</p>
                    </div>
                  </div>
                )}

                <div className="grid gap-4">
                  {filteredData.length === 0 ? (
                    <div className="text-center py-10 text-slate-500">No colleges found. Try adjusting filters.</div>
                  ) : (
                    <>
                      {/* 👇 IMPLEMENTED SLICE AND MAP */}
                      {filteredData.slice(0, visibleCount).map((college) => {
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
                              <div className="flex flex-col justify-between min-w-[170px] gap-3">
                                <div className="text-center px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-100">
                                  <p className="text-[10px] uppercase font-bold text-indigo-400 tracking-wide">
                                    Closing Rank
                                  </p>
                                  <p className="text-2xl font-extrabold text-indigo-600 leading-tight">
                                    #{college.closingRank}
                                  </p>
                                </div>
                                {college.gender && (
                                  <div className="text-center">
                                    <span className="inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                      <User size={12} className="mr-1 opacity-70" />
                                      {college.gender}
                                    </span>
                                  </div>
                                )}
                                {userRank && (
                                  <div>
                                    <div className="flex justify-between text-[9px] text-slate-400 mb-1">
                                      <span>You</span>
                                      <span>{userRank}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full rounded-full ${prob.color === 'emerald'
                                          ? 'bg-emerald-500'
                                          : prob.color === 'blue'
                                            ? 'bg-blue-500'
                                            : prob.color === 'amber'
                                              ? 'bg-amber-500'
                                              : 'bg-rose-500'
                                          }`}
                                        style={{
                                          width: `${Math.min(
                                            100,
                                            (userRank / college.closingRank) * 100
                                          )}%`,
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* 👇 ADDED LOAD MORE BUTTON */}
                      {visibleCount < filteredData.length && (
                        <button
                          onClick={() => setVisibleCount((prev) => prev + 6)}
                          className="w-full mt-4 py-4 rounded-xl font-bold text-indigo-600 bg-indigo-50 border-2 border-dashed border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 transition-all flex items-center justify-center gap-2"
                        >
                          Load More Colleges ({filteredData.length - visibleCount} remaining)
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 font-medium">© 2026 Rank2College. Built for students, by students.</p>
          <p className="text-xs text-slate-400 mt-2">Disclaimer: Predictions are estimates based on past cutoffs and trends till the last round 5. Official counselling results may differ. Always verify with official counselling portals.</p>
        </div>
      </footer>
    </div>
  );
}