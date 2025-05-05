const { Sequelize } = require('sequelize');
// require('dotenv').config();

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
}

const sequelize = new Sequelize(sqlConfig.database, sqlConfig.user, sqlConfig.password, {
  host: sqlConfig.server,
  dialect: 'mssql',
  port: 1433,
  dialectOptions: {
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
  }
});

module.exports = sequelize;