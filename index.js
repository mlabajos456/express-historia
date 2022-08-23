const express = require("express");
const { httpPort, appVersion } = require("./config/config");
const path = require("path");
const app = express();
const response = require("./helpers/response");
const { sequelize } = require("./models/index");

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

app.use(function (err, req, res, next) {
  res.status(500).send({
    error: ["Unexpected error occurred [index]"],
  });
});

app.listen(httpPort, () => console.log(`http://127.0.0.1:${httpPort}`));
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión database éxito.");
  })
  .catch((err) => {
    console.error("Error database:", err);
  });
