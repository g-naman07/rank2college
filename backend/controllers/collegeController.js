const prisma = require('../config/db');

// --- CONSTANTS ---
const TOTAL_CANDIDATES_MAINS = 1400000; // ~14 Lakhs

// Category Distributions (Used for Rank Calculation)
const CATEGORY_STATS = {
    'OPEN':    1.0,       
    'OBC-NCL': 0.35, 
    'EWS':     0.12, 
    'SC':      0.10, 
    'ST':      0.04  
};

exports.predictColleges = async (req, res) => {
    try {
        let { rank, marks, category, quota, gender, examMode } = req.body;
        
        // --- 1. SANITIZE INPUTS (Fixes whitespace issues) ---
        if (category) category = category.trim();
        if (quota) quota = quota.trim();
        if (gender) gender = gender.trim();

        // Default to Mains if not specified
        const isAdvanced = examMode === 'JEE_ADVANCED';
        let predictedPercentile = null; 

        // --- 2. RANK CALCULATION (Only for Mains) ---
        if (!rank && marks) {
            if (isAdvanced) {
                return res.status(400).json({
                    success: false,
                    message: "We cannot predict JEE Advanced Rank from Marks as the total score varies every year. Please enter your Rank."
                });
            }

            console.log(`🧮 Calculating Mains Rank for Marks: ${marks}`);
            
            const trendRule = await prisma.marksVsRank.findFirst({
                where: { year: 2025, minMarks: { lte: parseInt(marks) } },
                orderBy: { minMarks: 'desc' }
            });

            if (trendRule) {
                predictedPercentile = trendRule.percentile;
                const poolSize = TOTAL_CANDIDATES_MAINS * (CATEGORY_STATS[category] || 1);
                
                // Formula: (100 - Percentile) * CategoryPool / 100
                rank = Math.floor(((100 - trendRule.percentile) * poolSize) / 100);
                if (rank <= 0) rank = 1;
            } else {
                rank = 800000; // Default fallback
            }
        }

        // --- 3. FLEXIBLE VALIDATION (Debug Mode) ---
        // We allow missing category/quota so you can see ALL data in Postman
        if (!rank) {
            return res.status(400).json({ success: false, message: "Rank is required." });
        }

        // --- 4. PREPARE FILTERS ---
        // 'contains' is safer than 'startsWith'
        const instituteFilter = isAdvanced 
            ? { contains: 'Indian Institute of Technology' } 
            : { not: { contains: 'Indian Institute of Technology' } }; 

        // --- 5. DATABASE QUERY ---
        const colleges = await prisma.college.findMany({
            where: {
                // Only apply filters if they exist in the request
                ...(category && { category: { equals: category, mode: 'insensitive' } }),
                ...(quota && { quota: { equals: quota, mode: 'insensitive' } }),
                ...(gender && { gender: { equals: gender, mode: 'insensitive' } }),
                
                // Apply the Exam Mode Filter
                institute: instituteFilter,

                closingRank: { gte: parseInt(rank) }
            },
            orderBy: { closingRank: 'asc' },
            // take: 100 
        });

        res.status(200).json({
            success: true,
            predictedRank: marks ? rank : null,
            predictedPercentile: predictedPercentile,
            count: colleges.length,
            data: colleges
        });

    } catch (error) {
        console.error("❌ API Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};