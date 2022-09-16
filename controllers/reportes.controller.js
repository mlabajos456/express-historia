

const response = require("../helpers/response");
const atencionService = require("../services/atencion.service");
const pdfService = require("../services/pdf.service")
const PDFDocument  = require("pdfkit-construct");
class ReportesController {
    async getReportes(req, res) {       
        /*  const limit = req.body.limit
        let befPage = req.body.page
        let page = req.body.page
        if(page == 1){
            page = 0
        }else{
            page = (page -1) * limit
        }  */  
        const doc = new PDFDocument ({size:"a4",bufferPages: true,});      
        doc.image(__dirname+"/../services/his.jpg", 0, 0, {width: 595, height: 842})
        doc.pipe(res);
        doc.end()
        /*   doc.on("data", dataCallback)
    doc.on("end", endCallback) */
        /* const stream = res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=reporte.pdf",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        }); */
        /* doc.on("data", (data) =>{ stream.write(data)});
        doc.on("end", () => {stream.end()}); */
        /*  const stream = res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=reporte.pdf",
        })
        pdfService.createPDF((chunk ) => stream.write(chunk)
            , () => stream.end(), res) */
        try {
           
            /*  await atencionService.getAllAtencionByHojaReport(page, limit, req.params.id).then((val) => {        

                const data = {
                    "page": befPage,
                    "limit": limit,
                    "total": val.count,
                    "data": val.rows
                }
                let listPosiciones= []
                let total_bloques =12 ;
                let reportPage = 1;    
                let positionHoja = 1;            
                val.rows.forEach(paciente => {
                    let totalDiag = paciente.his_detalle_diagnosticos.length;
                    let numBloquesOcupar= 1;
                    if(totalDiag >3){
                        numBloquesOcupar = totalDiag / 3;
                        if(numBloquesOcupar % 1 != 0){
                            numBloquesOcupar = Math.trunc(numBloquesOcupar) + 1;
                        }
                        total_bloques = total_bloques - numBloquesOcupar;      
                       
                        if(total_bloques < 0){
                            total_bloques = 12+ total_bloques
                            reportPage++
                        }                        
                        listPosiciones.push({bloque: numBloquesOcupar, page: reportPage, })
                    }else{
                        total_bloques -= 1;
                        if(total_bloques < 0){
                            total_bloques = 12+ total_bloques
                            reportPage++
                        }
                        listPosiciones.push({bloque: numBloquesOcupar, page: reportPage,  })
                    }
                    
                    
                });                

                response.sendData(res,listPosiciones, "success");
            }) */
        } catch (error) {
            console.log(error)
            response.sendBadRequest(res, error
            );
        }
    }
}
module.exports = new ReportesController();
