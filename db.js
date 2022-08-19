const Sequelize = require("sequelize");
/* const MarcaModel = require("./models/marca.model");
const ProductoModel = require("./models/producto.model");
const PresentacionModel = require("./models/presentacion.model"); */
const config = require("./config/config");

// initialize database connection
const sequelize = new Sequelize(
  config.db.name, // database name
  config.db.user, // user
  config.db.password, // password
  {
    host: config.db.host,
    dialect: config.db.dialect,
    operatorsAliases: false,
    timezone: "+00:00", // set time zone to UTC
    port: config.db.port,
  }
);

// check database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión database éxito.");
  })
  .catch((err) => {
    console.error("Error database:", err);
  });

module.exports = {
  sequelize,
  Sequelize
}
/* const Usuario = UsuarioModel(sequelize, Sequelize); */

/* const Producto = ProductoModel(sequelize, Sequelize);
const Presentacion = PresentacionModel(sequelize, Sequelize);
const Marca = MarcaModel(sequelize, Sequelize);

Presentacion.hasOne(Producto, {
  foreignKey: {
    name: "id_presentacion",
  },
});

Producto.belongsTo(Presentacion, {
  foreignKey: {
    name: "id_presentacion",
  },
});

Marca.hasOne(Presentacion, {
  foreignKey: {
    name: "id_marca",
  },
});

Presentacion.belongsTo(Marca, { foreignKey: { name: "id_marca" } });

module.exports = {
  //"UsuarioModel": Usuario,
  ProductoModel: Producto,
  PresentacionModel: Presentacion,
  MarcaModel: Marca
}; */
