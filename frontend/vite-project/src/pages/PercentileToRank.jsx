import React, { useState } from 'react';

const PercentileToRank = () => {
    const [percentile, setPercentile] = useState('');
    const [category, setCategory] = useState('OPEN');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await fetch('http://localhost:5001/api/percentile2rank', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ percentile, category }),
            });

            const data = await response.json();
            if (data.success) {
                setResult(data);
            } else {
                setError(data.message || 'Failed to calculate rank');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        // 1. ADDED: min-h-screen, bg-slate-50 (Theme Color), and pt-36 (To clear Navbar)
        <div className="min-h-screen bg-slate-50 text-slate-900 pt-36 pb-20 px-4 relative overflow-hidden">
            
            {/* Optional: Background Grid Effect (Matches other pages) */}
            <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none fixed"></div>

            <div className="container mx-auto max-w-2xl relative z-10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
                        Percentile to Rank
                    </h1>
                    <p className="text-slate-500">Calculate your expected rank based on NTA trends.</p>
                </div>

                <div className="bg-white shadow-xl shadow-slate-200/60 rounded-3xl p-8 border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-slate-700 text-sm font-bold mb-2">
                                JEE Mains Percentile
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-slate-900"
                                type="number"
                                step="0.0000001"
                                min="0"
                                max="100"
                                placeholder="e.g. 95.5"
                                value={percentile}
                                onChange={(e) => setPercentile(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-slate-700 text-sm font-bold mb-2">
                                Category
                            </label>
                            <select
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none font-medium text-slate-700"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="OPEN">OPEN</option>
                                <option value="OBC-NCL">OBC-NCL</option>
                                <option value="EWS">EWS</option>
                                <option value="SC">SC</option>
                                <option value="ST">ST</option>
                            </select>
                        </div>

                        <button
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl transition-all transform active:scale-95"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Calculating...' : 'Predict Rank'}
                        </button>
                    </form>
                </div>

                {error && (
                    <div className="mt-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-2">
                        <span>⚠️</span> {error}
                    </div>
                )}

                {result && (
                    <div className="mt-8 bg-white border border-slate-200 p-8 rounded-3xl shadow-xl shadow-slate-200/50 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                        
                        <h2 className="text-xl font-bold text-slate-800 mb-6">Prediction Result</h2>
                        
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Percentile</p>
                                <p className="text-2xl font-bold text-slate-800">{percentile}</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category</p>
                                <p className="text-2xl font-bold text-slate-800">{category}</p>
                            </div>
                        </div>

                        <div className="pt-2">
                            <p className="text-sm font-medium text-slate-500 mb-2">Predicted Rank</p>
                            <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                                #{result.predictedRank.toLocaleString()}
                            </p>
                            {result.expectedRankRange && (
                                <p className="mt-2 text-sm font-medium text-emerald-600 bg-emerald-50 inline-block px-3 py-1 rounded-full border border-emerald-100">
                                    Range: {result.expectedRankRange}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PercentileToRank;