const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {'sequelize': null, 'Sequelize': null};
console.log(config);
const sequelize = new Sequelize(
  'simys', // database name
  'postgres', // user
  'postgres', // password
  {
    host: '172.16.102.206',
    dialect: 'postgres',
    operatorsAliases: false,
    timezone: "+00:00", // set time zone to UTC
    port: '5432',
  }
);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
   
    const model = sequelize.import(path.join(__dirname, file));
   
    db[model.name] = model;
  });

/* Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}); */

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
