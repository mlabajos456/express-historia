const express = require("express");
const { httpPort, appVersion } = require("./config/config");
const path = require("path");
const app = express();
const response = require("./helpers/response");
app.use(express.static("doc"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CORS
app.use(response.setHeadersForCORS);
//Ruta Documentacion
app.get("/docs", function (req, res) {
    res.sendFile(path.join(__dirname + "/doc/index.html"));
});

app.use("/" + appVersion + "/auth", require("./routes/auth.route"));
app.use("/" + appVersion + "/", require("./routes/report.route"));

app.use(require("./middlewares/jwt.middleware"));
app.use("/" + appVersion + "/support/", require("./routes/supports.route"));
app.use("/" + appVersion + "/", require("./routes/hoja-atencion.route"));
app.use("/" + appVersion + "/", require("./routes/atencion.route"));
app.use("/" + appVersion + "/", require("./routes/detalle-diagnostico.route"));
app.use("/" + appVersion + "/", require("./routes/usuario.route"));
app.use("/" + appVersion + "/ubigeo/", require("./routes/ubigeo.route"));



/* app.use(function (err, req, res) {
    response.sendBadRequest(res, err)
}); */

app.listen(httpPort, () => console.log(`http://127.0.0.1:${httpPort}`));

module.exports = app;
