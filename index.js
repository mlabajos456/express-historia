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
app.use(require("./middlewares/jwt.middleware"));

app.use("/" + appVersion + "/", require("./routes/main.route"));
app.use("/" + appVersion + "/support/", require("./routes/supports.route"));

app.use(function (err, req, res, next) {
  res.status(500).send({
    error: ["Ruta no definida"],
  });
});

app.listen(httpPort, () => console.log(`http://127.0.0.1:${httpPort}`));