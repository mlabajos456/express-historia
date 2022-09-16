
const PDFDocument  = require("pdfkit-construct");
function createPDF(dataCallback, endCallback, res)  {
    const doc = new PDFDocument ({size:"a4",bufferPages: true,});
    doc.on("data", dataCallback)
    doc.on("end", endCallback)
    doc.image(__dirname+"/his.jpg", 0, 0, {width: 595, height: 842})
    doc.fontSize(12).text("hola mundo desde pdf", 30, 30);
    doc.render()
    doc.end();
}

module.exports = { createPDF };