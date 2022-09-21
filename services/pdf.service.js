
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
    doc.fontSize(6).text(head.anio, 38.5, 135)
    doc.fontSize(6).text(head.mes, 68, 135)
    doc.fontSize(6).text(head.establecimiento.establecimiento , 117.71, 135)
    doc.fontSize(6).text(head.ups.descripcion, 271.5, 135)
    doc.fontSize(6).text(head.personal.numero_documento, 475, 135)
    doc.fontSize(5).text(head.personal.nombre_completo, 509, 135)

    switch (head.his_turno.id_turno) {
    case 1:
        doc.moveTo(484, 122).lineTo(512, 112).stroke() /* M */            
        break;
    case 2:
        doc.moveTo(512, 122).lineTo(544, 112).stroke() /* T */
        break;
    case 3:
        doc.moveTo(545, 122).lineTo(578, 112).stroke() /* N */
        break;    
    default:
        break;
    }

}
function printBodyPDF (doc,atencion, diag, position ) {
    switch (position) {
    case 1:
        paintedPosition(doc,atencion,diag,0)
        break;
    case 2:
        paintedPosition(doc,atencion,diag,50)
        break;
    case 3:
        paintedPosition(doc,atencion,diag,99)
        break;
    case 4:
        paintedPosition(doc,atencion,diag,148)
        break;
    case 5: 
        paintedPosition(doc,atencion,diag,198)
        break;
    case 6:
        paintedPosition(doc,atencion,diag,248)
        break;
    case 7:
        paintedPosition(doc,atencion,diag,296.5)
        break;
    case 8:
        paintedPosition(doc,atencion,diag,346)
        break;
    case 9:
        paintedPosition(doc,atencion,diag,395.7)
        break;
    case 10:
        paintedPosition(doc,atencion,diag,445)
        break;
    case 11:
        paintedPosition(doc,atencion,diag,495)
        break;
    case 12:
        paintedPosition(doc,atencion,diag,545)
        break;

    default:
        break;
    }
}


function paintedPosition (doc , lista, diag, position){
    let paciente = lista.paciente.paciente
    let atencion = lista.paciente
    doc.fontSize(12).text("31", 39, 198 + position) /* DÍA */
    doc.fontSize(6).text(paciente.documento, 62, 185.62 + position) /* DNI */
    doc.fontSize(6).text(atencion.num_historia_clinica, 59, 199 + position) /* DÍA */
    doc.fontSize(6).text(atencion.estado_gestante, 59, 212 + position) /*nombre y Apellidos */
    doc.fontSize(6).text(paciente.nombres, 126, 174 + position) /* apellido */
    doc.fontSize(6).text(atencion.id_financiador    , 120, 189 + position) /* financiador con space */
  
   
        
    //doc.fontSize(6).text("Sanidad", 111, 185 + position) /* financiador con space */
    //   doc.fontSize(6).text("Naval", 111, 191 + position) /* financiador con space */

    doc.fontSize(6).text(paciente.etnia.descripcion, 111, 207 + position) /* etnia  */
    //
    doc.fontSize(6).text(paciente.procedencia.distrito, 136, 189 + position) /* Distrito de procedencia */
    doc.fontSize(6).text(atencion.cp_procedencia.descripcion, 136, 208 + position) /* centro poblado de procedencia */
    doc.fontSize(6).text("56", 197, 199 + position) /* Edad */

    doc.moveTo(209, 194 + position).lineTo(220, 182 + position).stroke() /* AÑO */
    doc.moveTo(209, 207 + position).lineTo(220, 195 + position).stroke() /* MES */
    doc.moveTo(209, 220 + position).lineTo(220, 208+ position).stroke() /* DÍA */
        
    if(paciente.sexo == "1"){
        doc.moveTo(221, 201 + position).lineTo(235, 182 + position).stroke() /* masculino */
    }else{
        doc.moveTo(221, 220 + position).lineTo(235, 201 + position).stroke() /* femenino */     
    }
        
    doc.fontSize(6).text(atencion.cef, 253, 191 + position) /* PERIMETRO CEFA */
    doc.fontSize(6).text(atencion.abd, 253, 209 + position)  /* PERIMETRO ABDOMINAL */

    doc.fontSize(6).text(atencion.peso, 289, 185 + position)  /* peso +52 por cada position */
    doc.fontSize(6).text(atencion.talla, 289, 198 + position)  /* talla + 52 por cada position */
    doc.fontSize(6).text(atencion.hemoglobina, 289, 211 + position)  /* Hemoglobina + 52 por cada position */

    /* cortar fecha hemoglobina por dia mes anio */
    let fecha_hb = atencion.fecha_hb.split("-")
    doc.fontSize(6).text(fecha_hb[0], 332, 174 + position)  /* DIA + 52 por cada position */
    doc.fontSize(6).text(fecha_hb[1], 348, 174 + position)  /* MES + 52 por cada position */
    doc.fontSize(6).text(fecha_hb[2], 365, 174 + position)  /* AÑO + 52 por cada position */

    
    let fecha_fum = atencion.fum.split("-")
    doc.fontSize(6).text(fecha_fum[0], 532, 174 + position)  /* DIA + 52 por cada position */
    doc.fontSize(6).text(fecha_fum[1], 549, 174 + position)  /* MES + 52 por cada position */
    doc.fontSize(6).text(fecha_fum[2], 563, 174 + position)  /* AÑO + 52 por cada position */


      
    switch (atencion.condicion_establec) {
    case "N":
        doc.moveTo(306, 194 + position).lineTo(321, 181 + position).stroke() /* ESTABLECIMIENTO N */  
        break;
    case "C":
        doc.moveTo(306, 207 + position).lineTo(321, 195 + position).stroke() /* ESTABLECIMIENTO C */ 
        break;
    case "R":
        doc.moveTo(306, 220 + position).lineTo(321, 208 + position).stroke() /* ESTABLECIMIENTO R */ 
        break;
    
    default:
        break;
    }
                      
     
    switch (atencion.condicion_servicio) {
    case "N":
        doc.moveTo(321, 194 + position).lineTo(335, 181 + position).stroke() /* ESTABLECIMIENTO N */    
        break;
    case "C":
        doc.moveTo(321, 207 + position).lineTo(335, 195 + position).stroke() /* ESTABLECIMIENTO C */  
        break;
    case "R":
        doc.moveTo(321, 220 + position).lineTo(335, 208 + position).stroke() /* ESTABLECIMIENTO R */  
        break;
        
    default:
        break;
    }
   

    doc.fontSize(6).text("diag[0]", 346, 186 + position) /* DIAG 1 */
    doc.fontSize(6).text("diag[1]", 346, 199 + position) /* DIAG 2 */
    doc.fontSize(6).text("diag[2]", 346, 211 + position) /* DIAG 3 */
    console.log(diag)
    switch (diag[0].diagnostico_tipo) {
    case "P":
        doc.moveTo(461, 194 + position).lineTo(472, 181 + position).stroke() /* TIPO DE DIAGNÓSTICO P */ 
        break;
    case "D":
        doc.moveTo(473, 194 + position).lineTo(484, 181 + position).stroke() /* TIPO DE DIAGNÓSTICO D */  
        break;
    case "R":
        doc.moveTo(484, 194 + position).lineTo(495, 181 + position).stroke() /* TIPO DE DIAGNÓSTICO R */ 
        break;
    
    default:
        break;
    }
    if(diag[0].his_labs[0]){
        doc.fontSize(6).text(diag[0].his_labs[0].descripcion, 499, 185 + position)
    }
    
    if(diag[0].his_labs[1]){
        doc.fontSize(6).text(diag[0].his_labs[1].descripcion, 512, 185 + position)
    }
    if(diag[0].his_labs[2]){
        doc.fontSize(6).text(diag[0].his_labs[2].descripcion, 524, 185 + position)
    }
    doc.fontSize(6).text(diag[0].id_cie, 542, 185 + position)

    //posision 2
    if(diag[1]){
        switch (diag[1].diagnostico_tipo) {
        case "P":
            doc.moveTo(461, 207 + position).lineTo(472, 195 + position).stroke() /* TIPO DE DIAGNÓSTICO P */ 
            break;
        case "D":
            doc.moveTo(473, 207 + position).lineTo(484, 195 + position).stroke() /* TIPO DE DIAGNÓSTICO D */  
            break;
        case "R":
            doc.moveTo(484, 207 + position).lineTo(495, 195 + position).stroke() /* TIPO DE DIAGNÓSTICO R */  
            break;
                
        default:
            break;
        }

        if(diag[1].his_labs[0]){
            doc.fontSize(6).text(diag[1].his_labs[0].descripcion, 499, 198.5 + position)
        }
        
        if(diag[1].his_labs[1]){
            doc.fontSize(6).text(diag[1].his_labs[1].descripcion, 512, 198.5 + position)
        }
        if(diag[1].his_labs[2]){
            doc.fontSize(6).text(diag[1].his_labs[2].descripcion, 524, 198.5 + position)
        }
        doc.fontSize(6).text(diag[1].id_cie, 542, 198.5 + position)
       
       
       
        
    }
   

    if(diag[2]){
        //posision 3
        switch (diag[2].diagnostico_tipo) {
        case "P":
            doc.moveTo(461, 220 + position).lineTo(472, 208 + position).stroke() /* TIPO DE DIAGNÓSTICO P */ 
            break;
        case "D":
            doc.moveTo(473, 220 + position).lineTo(484, 208 + position).stroke() /* TIPO DE DIAGNÓSTICO D */  
            break;
        case "R":
            doc.moveTo(484, 220 + position).lineTo(495, 208 + position).stroke() /* TIPO DE DIAGNÓSTICO R */   
            break;
                
        default:
            break;
        }  
        
        
        if(diag[2].his_labs[0]){
            doc.fontSize(6).text(diag[2].his_labs[0].descripcion, 499, 211 + position)
        }
        
        if(diag[2].his_labs[1]){
            doc.fontSize(6).text(diag[2].his_labs[1].descripcion, 512, 211 + position)
        }
        if(diag[2].his_labs[2]){
            doc.fontSize(6).text(diag[2].his_labs[2].descripcion, 524, 211 + position)
        }
   
        doc.fontSize(6).text(diag[2].id_cie, 542, 211 + position)
    }

  


 


   

}
module.exports = { createPDF, printBodyPDF , printHeadPDF };