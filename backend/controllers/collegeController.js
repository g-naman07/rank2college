const prisma = require('../config/db');

// --- CONSTANTS ---
const TOTAL_CANDIDATES = 1400000; // ~14 Lakhs Total

// Approximate count of students in each category
const CATEGORY_STATS = {
    'OPEN':    TOTAL_CANDIDATES,       
    'OBC-NCL': TOTAL_CANDIDATES * 0.35, 
    'EWS':     TOTAL_CANDIDATES * 0.12, 
    'SC':      TOTAL_CANDIDATES * 0.10, 
    'ST':      TOTAL_CANDIDATES * 0.04  
};

exports.predictColleges = async (req, res) => {
    try {
        let { rank, marks, category, quota, gender } = req.body;
        
        // NEW: Variable to store the percentile we find
        let predictedPercentile = null; 

        // --- DYNAMIC RANK CALCULATION ---
        if (!rank && marks) {
            console.log(`🧮 Calculating Rank for Marks: ${marks} | Category: ${category}`);

            // 1. Fetch Percentile
            const trendRule = await prisma.marksVsRank.findFirst({
                where: {
                    year: 2025,
                    minMarks: { lte: parseInt(marks) }
                },
                orderBy: { minMarks: 'desc' }
            });

            if (trendRule) {
                // CAPTURE THE PERCENTILE
                predictedPercentile = trendRule.percentile;

                // 2. Determine Pool Size
                const categoryPool = CATEGORY_STATS[category] || TOTAL_CANDIDATES;
                
                // 3. Formula
                rank = Math.floor(((100 - trendRule.percentile) * categoryPool) / 100);
                
                if (rank <= 0) rank = 1;

                console.log(`📊 Percentile: ${predictedPercentile}% | Pool: ${categoryPool}`);
                console.log(`🎯 Estimated Rank: ${rank}`);
            } else {
                console.warn("⚠️ No trend found. Defaulting.");
                rank = 600000; 
            }
        }

        // --- VALIDATION ---
        if (!rank || !category || !quota) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide either Rank or Marks, plus Category and Quota." 
            });
        }

        console.log(`🔍 Searching: ${category} Rank ${rank}`);

        // --- DATABASE QUERY ---
        const colleges = await prisma.college.findMany({
            where: {
                category: { equals: category, mode: 'insensitive' },
                quota: { equals: quota, mode: 'insensitive' },
                ...(gender && { gender: { equals: gender, mode: 'insensitive' } }),

                closingRank: {
                    gte: parseInt(rank)
                }
            },
            orderBy: {
                closingRank: 'asc'
            },
            take: 50
        });

        // --- RESPONSE (Now with Percentile!) ---
        res.status(200).json({
            success: true,
            predictedRank: marks ? rank : null,
            predictedPercentile: predictedPercentile, // <--- NEW FIELD
            count: colleges.length,
            data: colleges
        });

    } catch (error) {
        console.error("❌ API Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};