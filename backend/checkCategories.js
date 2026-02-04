const prisma = require('./config/db');

async function checkData() {
    try {
        // Group by category and count how many colleges exist for each
        const results = await prisma.college.groupBy({
            by: ['category'],
            _count: {
                id: true
            }
        });

        console.log("📊 Database Breakdown by Category:");
        results.forEach(group => {
            console.log(`${group.category}: ${group._count.id} rows`);
        });

    } catch (e) {
        console.error(e);
    }
}

checkData();