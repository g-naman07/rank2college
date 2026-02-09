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

// New Percentile vs Rank Data (CRL)
const PERCENTILE_DATA = [
  { "percentile": 100, "rank": 10 },
  { "percentile": 99.9992043, "rank": 30 },
  { "percentile": 99.9937403, "rank": 145 },
  { "percentile": 99.99, "rank": 233 },
  { "percentile": 99.9004, "rank": 1641 },
  { "percentile": 99.8982, "rank": 1677 },
  { "percentile": 99.8016695, "rank": 3186 },
  { "percentile": 99.7938333, "rank": 3290 },
  { "percentile": 99.7018301, "rank": 4699 },
  { "percentile": 99.6987428, "rank": 4731 },
  { "percentile": 99.6007682, "rank": 6291 },
  { "percentile": 99.5966798, "rank": 6328 },
  { "percentile": 99.5010703, "rank": 7753 },
  { "percentile": 99.49677, "rank": 7824 },
  { "percentile": 99.4004213, "rank": 9345 },
  { "percentile": 99.3999618, "rank": 9358 },
  { "percentile": 99.3031387, "rank": 10816 },
  { "percentile": 99.2944396, "rank": 10903 },
  { "percentile": 99.203587, "rank": 12397 },
  { "percentile": 99.1994097, "rank": 12536 },
  { "percentile": 99.1043692, "rank": 13985 },
  { "percentile": 99.0928856, "rank": 14037 },
  { "percentile": 99.0052802, "rank": 15475 },
  { "percentile": 98.9999641, "rank": 15509 },
  { "percentile": 98.5003488, "rank": 23079 },
  { "percentile": 98.499, "rank": 23143 },
  { "percentile": 98.000774, "rank": 30646 },
  { "percentile": 97.999601, "rank": 30738 },
  { "percentile": 97.5087622, "rank": 38180 },
  { "percentile": 97.4946488, "rank": 38275 },
  { "percentile": 97.0042358, "rank": 45729 },
  { "percentile": 96.9987574, "rank": 45808 },
  { "percentile": 96.55, "rank": 52689 },
  { "percentile": 96.4896688, "rank": 53132 },
  { "percentile": 95.5040366, "rank": 68086 },
  { "percentile": 95.491651, "rank": 68304 },
  { "percentile": 95.0107132, "rank": 75118 },
  { "percentile": 94.9650286, "rank": 75668 },
  { "percentile": 94.008, "rank": 89947 },
  { "percentile": 93.9884614, "rank": 90372 },
  { "percentile": 93.1023262, "rank": 102450 },
  { "percentile": 93.0950208, "rank": 103113 },
  { "percentile": 93.0, "rank": 105000 },
  { "percentile": 92.5, "rank": 112000 },
  { "percentile": 92.0, "rank": 120000 },
  { "percentile": 91.5, "rank": 129000 },
  { "percentile": 91.0, "rank": 139000 },
  { "percentile": 90.5, "rank": 150000 },
  { "percentile": 90.0, "rank": 162000 },
  { "percentile": 89.5, "rank": 175000 },
  { "percentile": 89.0, "rank": 189000 },
  { "percentile": 88.5, "rank": 204000 },
  { "percentile": 88.0, "rank": 220000 },
  { "percentile": 87.5, "rank": 237000 },
  { "percentile": 87.0, "rank": 255000 },
  { "percentile": 86.5, "rank": 274000 },
  { "percentile": 86.0, "rank": 294000 },
  { "percentile": 85.5, "rank": 315000 },
  { "percentile": 85.0, "rank": 337000 },
  { "percentile": 84.5, "rank": 360000 },
  { "percentile": 84.0, "rank": 384000 },
  { "percentile": 83.5, "rank": 409000 },
  { "percentile": 83.0, "rank": 435000 },
  { "percentile": 82.5, "rank": 462000 },
  { "percentile": 82.0, "rank": 490000 },
  { "percentile": 81.5, "rank": 519000 },
  { "percentile": 81.0, "rank": 549000 },
  { "percentile": 80.5, "rank": 580000 },
  { "percentile": 80.0, "rank": 612000 },
  { "percentile": 79.5, "rank": 645000 },
  { "percentile": 79.0, "rank": 679000 },
  { "percentile": 78.5, "rank": 714000 },
  { "percentile": 78.0, "rank": 750000 },
  { "percentile": 77.5, "rank": 787000 },
  { "percentile": 77.0, "rank": 825000 },
  { "percentile": 76.5, "rank": 864000 },
  { "percentile": 76.0, "rank": 904000 },
  { "percentile": 75.5, "rank": 945000 },
  { "percentile": 75.0, "rank": 987000 },
  { "percentile": 74.5, "rank": 1030000 },
  { "percentile": 74.0, "rank": 1074000 },
  { "percentile": 73.5, "rank": 1120000 },
  { "percentile": 73.0, "rank": 1168000 },
  { "percentile": 72.5, "rank": 1218000 },
  { "percentile": 72.0, "rank": 1270000 },
  { "percentile": 71.5, "rank": 1324000 },
  { "percentile": 71.0, "rank": 1380000 },
  { "percentile": 70.5, "rank": 1438000 },
  { "percentile": 70.0, "rank": 1498000 }
];

function calculateRankFromPercentile(percentile) {
    const p = parseFloat(percentile);
    if (isNaN(p)) return 0;

    // If percentile is higher than the max in our table (100.0)
    if (p > 100.0) return 1;

    // If percentile is lower than the min in our table (70.0)
    if (p <= 70.0) {
        // Extrapolate using the last two points: 70.5 (1438000) and 70.0 (1498000)
        // Slope = (1498000 - 1438000) / (70.0 - 70.5) = 60000 / -0.5 = -120000
        return 1498000 + (-120000 * (p - 70.0));
    }

    // Find the interval in the table
    for (let i = 0; i < PERCENTILE_DATA.length - 1; i++) {
        const upper = PERCENTILE_DATA[i];
        const lower = PERCENTILE_DATA[i+1];
        if (p <= upper.percentile && p >= lower.percentile) {
            // Linear interpolation
            // y = y0 + (y1 - y0) * (x - x0) / (x1 - x0)
            // x is p, x0 is upper.percentile, x1 is lower.percentile
            // y0 is upper.rank, y1 is lower.rank
            return upper.rank + (lower.rank - upper.rank) * (p - upper.percentile) / (lower.percentile - upper.percentile);
        }
    }
    return 1;
}

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
                const baseRank = calculateRankFromPercentile(predictedPercentile);
                const multiplier = CATEGORY_STATS[category] || 1;
                rank = Math.floor(baseRank * multiplier);
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
    ...(category && { category: { equals: category, mode: 'insensitive' } }),
    ...(quota && { quota: { equals: quota, mode: 'insensitive' } }),
    ...(gender && { gender: { equals: gender, mode: 'insensitive' } }),

    institute: instituteFilter,

    AND: [
    //   { openingRank: { gte: parseInt(rank) } },
      { closingRank: { gte: parseInt(rank) } }
    ],
  },

  orderBy: [
    // { openingRank: 'asc' },
    { closingRank: 'asc' }
  ],

  // OPTIONAL but recommended
  // take: 200
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

exports.percentileToRank = async (req, res) => {
    try {
        let { percentile, category } = req.body;

        if (!percentile) {
            return res.status(400).json({ success: false, message: "Percentile is required." });
        }

        if (category) category = category.trim();

        const baseRank = calculateRankFromPercentile(percentile);
        const multiplier = CATEGORY_STATS[category] || 1;
        let rank = Math.floor(baseRank * multiplier);
        if (rank <= 0) rank = 1;

        res.status(200).json({
            success: true,
            predictedRank: rank
        });

    } catch (error) {
        console.error("❌ API Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};