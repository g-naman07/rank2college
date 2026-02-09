const prisma = require('../config/db');
const generateCollegePDF = require('../utils/collegePdf');

exports.exportPredictPDF = async (req, res) => {
  try {
    let { rank, category, quota, gender, examMode } = req.body;

    if (!rank) {
      return res.status(400).json({ success: false, message: 'Rank is required' });
    }

    const instituteFilter =
      examMode === 'JEE_ADVANCED'
        ? { contains: 'Indian Institute of Technology' }
        : { not: { contains: 'Indian Institute of Technology' } };

    const colleges = await prisma.college.findMany({
      where: {
        ...(category && { category }),
        ...(quota && { quota }),
        ...(gender && { gender }),
        institute: instituteFilter,
        closingRank: { gte: Number(rank) },
      },
      orderBy: { closingRank: 'asc' },
    });

    const pdfDoc = generateCollegePDF(colleges, {
      rank,
      category,
      quota,
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=college-prediction.pdf'
    );

    pdfDoc.pipe(res);
    pdfDoc.end();

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'PDF generation failed' });
  }
};
