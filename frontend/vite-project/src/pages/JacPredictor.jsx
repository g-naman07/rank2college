import React, { useState } from 'react';
import { Search, MapPin, Building2, User, BookOpen, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';

// JAC Constants
const CATEGORIES = ['OPEN', 'EWS', 'OBC-NCL', 'SC', 'ST'];
const REGIONS = [
    { value: 'HS', label: 'Delhi Region (Candidate from Delhi)' },
    { value: 'OS', label: 'Outside Delhi (All India)' }
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
      
      <div className="container mx-auto max-w-6xl pt-40 pb-20 px-4">
        
        {/* HEADER */}
        <div className="text-center mb-12">
           <h1 className="text-4xl font-extrabold text-slate-900 mb-4">JAC Delhi Predictor</h1>
           <p className="text-slate-600">Predict admissions for DTU, NSUT, IIIT-Delhi & IGDTUW.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
            
            {/* LEFT: FORM */}
            <div className="lg:col-span-4 h-fit bg-white p-8 rounded-3xl shadow-xl shadow-orange-100/50 border border-orange-100">
               <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Rank */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">JEE Mains Rank (CRL)</label>
                    <input 
                      type="number" 
                      value={form.rank}
                      onChange={(e) => setForm({...form, rank: e.target.value})}
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
                                    onChange={(e) => setForm({...form, quota: e.target.value})}
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

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                    <select 
                      value={form.category}
                      onChange={(e) => setForm({...form, category: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none font-medium"
                    >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin"/> : "Predict JAC Colleges"}
                  </button>

               </form>
            </div>

            {/* RIGHT: RESULTS */}
            <div className="lg:col-span-8">
                {/* Result Mapping Logic Here (Same as JOSAA, just styled Orange) */}
                {/* Use results.data.map... */}
                { !results && <div className="text-center text-slate-400 mt-20">Enter details to find Delhi colleges.</div> }
                
                { results?.data?.map((college) => (
                    <div key={college.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-4 hover:border-orange-400 transition-all">
                        <h3 className="text-lg font-bold text-slate-900">{college.institute}</h3>
                        <div className="text-orange-600 font-medium text-sm mb-4">{college.program}</div>
                        <div className="flex justify-between items-end">
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600">{college.quota === 'HS' ? 'Delhi' : 'Outside'}</span>
                                <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600">{college.category}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-xs text-slate-400 font-bold uppercase block">Closing Rank</span>
                                <span className="text-2xl font-black text-slate-900">#{college.closingRank}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
      </div>
    </div>
  );
}