const db = require("../models/index");
const response = require("../helpers/response");
const atencionService = require("../services/atencion.service");
class ReportesController {
    async getReportes(req, res) {       
        const limit = req.body.limit
        let befPage = req.body.page
        let page = req.body.page
        if(page == 1){
            page = 0
        }else{
            page = (page -1) * limit
        } 
        try {
            await atencionService.getAllAtencionByHojaReport(page, limit, req.params.id).then((val) => {                
                const data = {
                    "page": befPage,
                    "limit": limit,
                    "total": val.count,
                    "data": val.rows
                }
                /*   for (const key in object) {
                    
                } */

                response.sendData(res, data, "success");
            })
        } catch (error) {
            console.log(error)
            response.sendBadRequest(res, error
            );
        }
    }
}
module.exports = new ReportesController();
