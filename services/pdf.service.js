
const doc = require("pdfkit");
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

function printHeadPDF (doc, head) {
    console.log(head)
    doc.fontSize(6).text("2022", 38.5, 135)
    doc.fontSize(6).text("Septiembre", 68, 135)
    doc.fontSize(6).text("HOSPITAL II - MOYOBAMBA", 117.71, 135)
    doc.fontSize(6).text("REHABILITACIÓN O FUNERARIA", 271.5, 135)
    doc.fontSize(6).text("72887473", 475, 135)
    doc.fontSize(5).text("Michael Labajos Detquizan", 509, 135)
    doc.moveTo(484, 122).lineTo(512, 112).stroke() /* M */
    doc.moveTo(512, 122).lineTo(544, 112).stroke() /* T */
    doc.moveTo(545, 122).lineTo(578, 112).stroke() /* N */
}
function printBodyPDF (doc,paciente, diag, position ) {
    switch (position) {
    case 1:
        paintedPosition(doc,paciente,diag,0)
        break;
    case 2:
        paintedPosition(doc,paciente,diag,50)
        break;
    case 3:
        paintedPosition(doc,paciente,diag,99)
        break;
    case 4:
        paintedPosition(doc,paciente,diag,148)
        break;
    case 5: 
        paintedPosition(doc,paciente,diag,198)
        break;
    case 6:
        paintedPosition(doc,paciente,diag,248)
        break;
    case 7:
        paintedPosition(doc,paciente,diag,296.5)
        break;
    case 8:
        paintedPosition(doc,paciente,diag,346)
        break;
    case 9:
        paintedPosition(doc,paciente,diag,395.7)
        break;
    case 10:
        paintedPosition(doc,paciente,diag,445)
        break;
    case 11:
        paintedPosition(doc,paciente,diag,495)
        break;
    case 12:
        paintedPosition(doc,paciente,diag,545)
        break;

    default:
        break;
    }
}


function paintedPosition (doc , paciente, diag, position){
    doc.fontSize(12).text("31", 39, 198 + position) /* DÍA */
    doc.fontSize(6).text("72887473", 62, 185.62 + position) /* DNI */
    doc.fontSize(6).text("HC 72887473", 59, 199 + position) /* DÍA */
    doc.fontSize(6).text("Michael Labajos", 59, 209 + position) /*nombre y Apellidos */
    doc.fontSize(6).text("Detquizan ", 59, 215 + position) /* apellido */

    doc.fontSize(6).text("S.I.S", 111, 189 + position) /* financiador con space */
        
    //doc.fontSize(6).text("Sanidad", 111, 185 + position) /* financiador con space */
    //   doc.fontSize(6).text("Naval", 111, 191 + position) /* financiador con space */

    doc.fontSize(6).text("Color", 111, 207 + position) /* etnia con space */

    doc.fontSize(6).text("Puerto Bermudez", 136, 189 + position) /* Distrito de procedencia */
    doc.fontSize(6).text("Pueblo Libre", 136, 208 + position) /* Distrito de procedencia */
    doc.fontSize(6).text("56", 197, 199 + position) /* Edad */

    doc.moveTo(209, 194 + position).lineTo(220, 182 + position).stroke() /* AÑO */
    doc.moveTo(209, 207 + position).lineTo(220, 195 + position).stroke() /* MES */
    doc.moveTo(209, 220 + position).lineTo(220, 208+ position).stroke() /* DÍA */
        
    doc.moveTo(221, 201 + position).lineTo(235, 182 + position).stroke() /* masculino */
    doc.moveTo(221, 220 + position).lineTo(235, 201 + position).stroke() /* femenino */        
        
    doc.fontSize(6).text("36", 253, 191 + position) /* PERIMETRO CEFA */
    doc.fontSize(6).text("45", 253, 209 + position)  /* PERIMETRO ABDOMINAL */

    doc.fontSize(6).text("45", 289, 185 + position)  /* peso +52 por cada position */
    doc.fontSize(6).text("45", 289, 198 + position)  /* talla + 52 por cada position */
    doc.fontSize(6).text("45", 289, 211 + position)  /* Hemoglobina + 52 por cada position */
      
    doc.moveTo(306, 194 + position).lineTo(321, 181 + position).stroke() /* ESTABLECIMIENTO N */                     
    doc.moveTo(306, 207 + position).lineTo(321, 195 + position).stroke() /* ESTABLECIMIENTO C */  
    doc.moveTo(306, 220 + position).lineTo(321, 208 + position).stroke() /* ESTABLECIMIENTO R */  

    doc.moveTo(321, 194 + position).lineTo(335, 181 + position).stroke() /* ESTABLECIMIENTO N */                     
    doc.moveTo(321, 207 + position).lineTo(335, 195 + position).stroke() /* ESTABLECIMIENTO C */  
    doc.moveTo(321, 220 + position).lineTo(335, 208 + position).stroke() /* ESTABLECIMIENTO R */  

    doc.fontSize(6).text("CLAMIDIA 1", 346, 186 + position) /* DIAG 1 */
    doc.fontSize(6).text("CLAMIDIA 2", 346, 199 + position) /* DIAG 2 */
    doc.fontSize(6).text("CLAMIDIA 3", 346, 211 + position) /* DIAG 3 */

    doc.moveTo(461, 194 + position).lineTo(472, 181 + position).stroke() /* TIPO DE DIAGNÓSTICO P */                     
    doc.moveTo(473, 194 + position).lineTo(484, 181 + position).stroke() /* TIPO DE DIAGNÓSTICO D */   
    doc.moveTo(484, 194 + position).lineTo(495, 181 + position).stroke() /* TIPO DE DIAGNÓSTICO R */                     
        
        
    doc.moveTo(461, 207 + position).lineTo(472, 195 + position).stroke() /* TIPO DE DIAGNÓSTICO P */  
    doc.moveTo(473, 207 + position).lineTo(484, 195 + position).stroke() /* TIPO DE DIAGNÓSTICO D */  
    doc.moveTo(484, 207 + position).lineTo(495, 195 + position).stroke() /* TIPO DE DIAGNÓSTICO R */  
        
        
    doc.moveTo(461, 220 + position).lineTo(472, 208 + position).stroke() /* TIPO DE DIAGNÓSTICO P */  
    doc.moveTo(473, 220 + position).lineTo(484, 208 + position).stroke() /* TIPO DE DIAGNÓSTICO D */  
    doc.moveTo(484, 220 + position).lineTo(495, 208 + position).stroke() /* TIPO DE DIAGNÓSTICO R */  

    doc.fontSize(6).text("1", 499, 185 + position)
    doc.fontSize(6).text("2", 512, 185 + position)
    doc.fontSize(6).text("3", 524, 185 + position)
    doc.fontSize(6).text("XZ001.90", 542, 185 + position)


    doc.fontSize(6).text("4", 499, 198.5 + position)
    doc.fontSize(6).text("5", 512, 198.5 + position)
    doc.fontSize(6).text("6", 524, 198.5 + position)
    doc.fontSize(6).text("XZ001.91", 542, 198.5 + position)


    doc.fontSize(6).text("7", 499, 211 + position)
    doc.fontSize(6).text("8", 512, 211 + position)
    doc.fontSize(6).text("9", 524, 211 + position)
    doc.fontSize(6).text("XZ001.92", 542, 211 + position)

}
module.exports = { createPDF, printBodyPDF , printHeadPDF };