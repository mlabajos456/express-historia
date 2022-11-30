const fs = require("fs");
const path = require("path");
const config = require("../config/config");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const db = {};
const basedatos = config.db_production
//const basedatos = config.db_test
const sequelize = new Sequelize(
    basedatos.name, 
    basedatos.user, 
    basedatos.password, 
    {
        host: basedatos.host,
        dialect: basedatos.dialect,
        operatorsAliases: false,
        timezone: "+05:00", // set time zone to UTC
        port: basedatos.port,
     
        //logging: false
    },
    
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

fs.readdirSync(__dirname)
    .filter(
        (file) =>
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
