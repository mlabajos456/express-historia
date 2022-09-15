
const PDFDocument  = require("pdfkit");
function createPDF(dataCallback, endCallback)  {
    const doc = new PDFDocument ({size:"a4"});
    doc.on("data", dataCallback)
    doc.on("end", endCallback)
    doc.image(__dirname+"/his.jpg", 0, 0, {width: 595, height: 842})
    doc.fontSize(12).text("hola mundo desde pdf", 30, 30);
    
    doc.end();
}

module.exports = { createPDF };