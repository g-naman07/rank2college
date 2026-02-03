const prisma = require('../config/db');

exports.predictColleges = async (req, res) => {
    try {
        const { rank, category, quota, gender } = req.body;

        // 1. Basic Validation
        if (!rank || !category || !quota) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide Rank, Category, and Quota." 
            });
        }

        console.log(`🔍 Search: Rank ${rank} | ${category} | ${quota} | ${gender || 'All'}`);

        // 2. Query Logic
        const colleges = await prisma.college.findMany({
            where: {
                // Case-insensitive matching (so "open" matches "OPEN")
                category: { equals: category, mode: 'insensitive' },
                quota: { equals: quota, mode: 'insensitive' },
                
                // Optional: If gender is sent, filter by it. 
                // (Note: In real JOSAA, Females can take Gender-Neutral seats too, 
                // but for now let's just match strictly to keep it simple)
                ...(gender && { gender: { equals: gender, mode: 'insensitive' } }),

                // THE GOLDEN RULE: 
                // You can get into a college if its Closing Rank is GREATER (worse) than yours.
                // e.g. Your Rank: 5000. College Closes at: 6000. -> You get in.
                closingRank: {
                    gte: parseInt(rank)
                }
            },
            orderBy: {
                closingRank: 'asc' // Show the "best" colleges (closest to your rank) first
            },
            take: 50 // Limit to top 50 results to save bandwidth
        });

        // 3. Response
        res.status(200).json({
            success: true,
            count: colleges.length,
            data: colleges
        });

    } catch (error) {
        console.error("❌ API Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server Error", 
            error: error.message 
        });
    }
};