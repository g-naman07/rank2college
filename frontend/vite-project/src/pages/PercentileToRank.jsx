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
            // Assuming backend runs on port 5001 as per server.js
            const response = await fetch('http://localhost:5001/api/percentile2rank', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
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
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Percentile to Rank Predictor</h1>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="percentile">
                            JEE Mains Percentile
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="percentile"
                            type="number"
                            step="0.0000001"
                            min="0"
                            max="100"
                            placeholder="Enter your percentile (e.g. 95.5)"
                            value={percentile}
                            onChange={(e) => setPercentile(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                            Category
                        </label>
                        <select
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="category"
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
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Calculating...' : 'Predict Rank'}
                    </button>
                </form>
            </div>

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                    <p>{error}</p>
                </div>
            )}

            {result && (
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded shadow-md">
                    <h2 className="text-xl font-bold text-green-800 mb-2">Prediction Result</h2>
                    <div className="grid grid-cols-2 gap-4 text-gray-700">
                        <div>
                            <p className="text-sm text-gray-500">Percentile</p>
                            <p className="font-semibold">{percentile}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Category</p>
                            <p className="font-semibold">{category}</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-green-200">
                        <p className="text-center text-gray-600">Predicted Rank</p>
                        {result.expectedRankRange && (
                            <div className="mt-3 text-center">
                                <p className="text-sm text-gray-500">Expected Rank Range</p>
                                <p className="text-lg font-semibold text-gray-800">
                                    {result.expectedRankRange}
                                </p>
                            </div>
                        )}

                        <p className="text-center text-4xl font-bold text-blue-600">{result.predictedRank.toLocaleString()}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PercentileToRank;