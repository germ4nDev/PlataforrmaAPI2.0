// const mongoose = require('mongoose');
const sql = require('mssql')

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
}

let pool;
async function connectDB() {
    try {
        pool = await sql.connect(dbConfig);
        console.log('Conectado a SQL Server');
    } catch (err) {
        console.error('Error de conexión:', err);
    }
}
connectDB();

const dbConnection = async() => {

    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(sqlConfig)
        const result = await sql.query `select * from PTLUsuarios where id = ${value}`
        console.dir(result)
    } catch (err) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }
    // try {
    //     await mongoose.connect( process.env.DB_CNN , {
    //         useNewUrlParser: true, 
    //         useUnifiedTopology: true,
    //         useCreateIndex: true
    //     });

    //     console.log('DB Online');

    // } catch (error) {
    //     console.log(error);
    //     throw new Error('Error a la hora de iniciar la BD ver logs');
    // }
}

module.exports = {
    dbConnection
}