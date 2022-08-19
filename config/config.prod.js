/**
 * This is for production use
 * Whatever values you provide here will override the default in ./config.js
 * So for examply mongoDbUrl for production database will go here
 */

 module.exports = {
    httpPort: process.env.PORT || 3000,
    db: {
        // most of the cases this will be localhost
        // unless you are connecting to remote database
        host: process.env.DB_HOST || "172.16.102.206",

        // name of the database connecting to
        name: process.env.DB_NAME || "simys",

        // database username
        user: process.env.DB_USER || "postgres",

        // password for above database user
        password: process.env.DB_PASSWORD || "postgres",

        // we are using Sequelize for connecting to database
        // Sequelize supports Mysql, SQlite, PostgreSQL and MSSQL
        // As applicable use either of 'mysql'|'sqlite'|'postgres'|'mssql'
        dialect: "postgres"
    },
};
