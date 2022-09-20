

const response = require("../helpers/response");
const atencionService = require("../services/atencion.service");
const pdfService = require("../services/pdf.service")
const PDFDocument  = require("pdfkit-construct");
const hojaAtencionService = require("../services/hoja-atencion.service");
class ReportesController {
    async getReportes(req, res) {       
        const limit = req.body.limit
        /* let befPage = req.body.page */
        let page = req.body.page
        if(page == 1){
            page = 0
        }else{
            page = (page -1) * limit
        }  
        const doc = new PDFDocument ({size:"a4",bufferPages: true, margin: 0});      
        doc.image(__dirname+"/../services/his.jpg", 0, 5, {width: 595, height: 842})
        let hojaAtencion = {}
        try {        
            await hojaAtencionService.getOneHojaAtencion(req.params.id).then(( hojaA ) => {
                hojaAtencion = hojaA                 
            }).catch((err) => {
                response.sendBadRequest(res, err);
            })
        }catch (error) {
            response.sendBadRequest(res, error);
        }
        pdfService.printHeadPDF(doc, hojaAtencion)  
        /* HEAD */
        let listPacientes = []
        try {
            await atencionService.getAllAtencionByHojaReport(1, 1000, req.params.id).then((val) => {
                listPacientes = new ReportesController().getPositionAndPage(val.rows)                
                        
            })
        } catch (error) {
            response.sendBadRequest(res, error);
        }
        
        let pageBefore = 1;       
        for (let index = 0; index < listPacientes.length; index++) {
            var atencion = listPacientes[index];
            if(pageBefore !== atencion.page){
                pageBefore = atencion.page
                doc.addPage()
                doc.image(__dirname+"/../services/his.jpg", 0, 5, {width: 595, height: 842})
                pdfService.printHeadPDF(doc, hojaAtencion)    
                
            }
            pdfService.printBodyPDF(doc, atencion, atencion.diag, atencion.position)    
        }
        /* HEAD */
        /* BODY */
       
        doc.pipe(res);
        doc.end()


           
        /* BODY */
       
       
        /*  doc.addPage()
        doc.image(__dirname+"/../services/his.jpg", 0, 0, {width: 595, height: 842})
        doc.fontSize(6).text("2022", 72.65, 135)
        doc.pipe(res);
        doc.end() */
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
        
        
        /*  try {
            await hojaAtencionService.getOneHojaAtencion(req.params.id).then(( hojaA ) => {
                
            }
            )
           
            await atencionService.getAllAtencionByHojaReport(page, limit, req.params.id).then((val) => {              
                

                var listPosiciones = new ReportesController().getPositionAndPage(val.rows)
                        
               
                               

                response.sendData(res,listPosiciones, "success");
            })
        } catch (error) {
            console.log(error)
            response.sendBadRequest(res, error
            );
        } */
    }

    getPositionAndPage(data){        
        let numberPage = 1
        let positionPage = 0
        let listPosition = []
        let tempPositionPage = 0
        for (let index = 0; index < data.length; index++) {
            tempPositionPage = positionPage  
            const element = data[index];

            const diag = element.his_detalle_diagnosticos;
            const totalDiag = diag.length
            tempPositionPage +=1
  
          

            if (totalDiag <= 3) {
                if(tempPositionPage > 12){
                    positionPage = 1
                    numberPage +=1
                }
                positionPage  = tempPositionPage
                listPosition.push(
                    {
                        page: numberPage,
                        position: positionPage,
                        totalDiag: totalDiag,
                        totalGrupos: 1,
                        paciente: element.paciente,
                        grupo: 1,
                        diag: element.diag
                    }
                )
            }else{
                let totalGrupos = totalDiag / 3
                if (totalGrupos % 1 != 0) {
                    totalGrupos = Math.trunc(totalGrupos) + 1 
                }        

                let tempPositionPage = positionPage 
                let tempNumberPage = numberPage   
   
                for (let index = 0; index < totalGrupos; index++) {
                    tempPositionPage +=1
                    if(tempPositionPage > 12){
                        positionPage = 1
                        numberPage +=1
                    }
      
                    if(tempPositionPage > 12){
                        tempNumberPage +=1
                        tempPositionPage = 1
                    }      
                    positionPage = tempPositionPage
                    numberPage = tempNumberPage
                    listPosition.push(
                        {
                            page: numberPage,
                            position: positionPage,
                            totalDiag: totalDiag,
                            totalGrupos: totalGrupos,
                            paciente: element,
                            grupo: index+1,
                            diag: element.his_detalle_diagnosticos.slice(index * 3, (index * 3) + 3)
                        }
                    )
                }
            }
        }
        return listPosition
    }
   
}
module.exports = new ReportesController();
