const express = require("express");
const { httpPort, appVersion } = require("./config/config");
const path = require("path");
const app = express();
const response = require("./helpers/response");
const jwt = require("./middlewares/jwt.middleware");

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
app.use("/" + appVersion + "/", jwt, require("./routes/main.route"));
app.use("/" + appVersion + "/support/", jwt, require("./routes/supports.route"));

app.use(function (err, req, res, next) {
  console.log(req);
  res.status(500).send({
    error: ["Ruta no definida"],
  });
});

app.listen(httpPort, () => console.log(`http://127.0.0.1:${httpPort}`));