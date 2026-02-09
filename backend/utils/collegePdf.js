const PDFDocument = require('pdfkit');

/**
 * Beautified College PDF Generator
 * Features: Zebra striping, professional header, modular structure
 */
function generateCollegePDF(colleges, meta) {
  const doc = new PDFDocument({ 
    margin: 50, 
    size: 'A4',
    bufferPages: true // Allows for total page count in footers
  });

  // Theme Constants
  const colors = {
    primary: '#4f46e5',
    secondary: '#1e1b4b',
    text: '#111827',
    muted: '#6b7280',
    border: '#e5e7eb',
    stripe: '#f9fafb'
  };

  const tableTop = 170;
  const colPositions = {
    inst: 50,
    prog: 190,
    quota: 360,
    cat: 430,
    rank: 495
  };

  // --- 1. Header Section ---
  const drawHeader = () => {
    // Header Background Accent
    doc.rect(0, 0, doc.page.width, 120).fill(colors.primary);
    
    doc.fillColor('#ffffff')
       .fontSize(24)
       .text('College Predictor Results', 50, 45, { weight: 'bold' });

    doc.fontSize(10)
       .fillColor('#e0e7ff')
       .text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 50, 80);

    // Meta Info Card
    doc.rect(50, 110, 495, 40).fill('#ffffff').stroke(colors.border);
    doc.fillColor(colors.secondary).fontSize(10);
    
    const metaText = `Rank: ${meta.rank}  |  Category: ${meta.category || 'All'}  |  Quota: ${meta.quota || 'All'}`;
    doc.text(metaText, 50, 125, { align: 'center', width: 495 });
  };

  // --- 2. Table Headers ---
  const drawTableHeaders = () => {
    doc.fillColor(colors.secondary)
       .fontSize(10)
       .font('Helvetica-Bold');

    doc.text('INSTITUTE', colPositions.inst, tableTop)
       .text('PROGRAM', colPositions.prog, tableTop)
       .text('QUOTA', colPositions.quota, tableTop)
       .text('CATEGORY', colPositions.cat, tableTop)
       .text('CLOSING', colPositions.rank, tableTop);

    doc.moveTo(50, tableTop + 15).lineTo(545, tableTop + 15).strokeColor(colors.border).stroke();
  };

  // --- 3. Table Rows ---
  const drawRows = () => {
    let currentY = tableTop + 25;

    colleges.forEach((c, i) => {
      // Check for page overflow
      if (currentY > 750) {
        doc.addPage();
        currentY = 50; // Reset Y for new page
      }

      // Zebra Striping
      if (i % 2 === 0) {
        doc.rect(50, currentY - 5, 495, 25).fill(colors.stripe);
      }

      doc.fillColor(colors.text)
         .fontSize(9)
         .font('Helvetica');

      // Row Content
      doc.text(c.institute, colPositions.inst, currentY, { width: 130, height: 20, ellipsis: true })
         .text(c.program, colPositions.prog, currentY, { width: 160, height: 20, ellipsis: true })
         .text(c.quota, colPositions.quota, currentY)
         .text(c.category, colPositions.cat, currentY)
         .font('Helvetica-Bold')
         .text(c.closingRank.toLocaleString(), colPositions.rank, currentY, { align: 'right', width: 50 });

      currentY += 25;
    });
  };

  // --- 4. Footer ---
  const drawFooter = () => {
    const pages = doc.bufferedPageRange();
    for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i);
      doc.fillColor(colors.muted)
         .fontSize(8)
         .text(
           `Page ${i + 1} of ${pages.count} • Rank2College Official Report`,
           50,
           doc.page.height - 40,
           { align: 'center', width: 495 }
         );
    }
  };

  // Execution
  drawHeader();
  drawTableHeaders();
  drawRows();
  drawFooter();

  return doc;
}

module.exports = generateCollegePDF;