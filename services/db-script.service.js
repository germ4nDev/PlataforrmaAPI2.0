/*
    Author: German Valencia
    Refactored for: QPLUS Architecture, MSSQL Batch Execution & Class-Based Service
*/
const fs = require('fs').promises;
const path = require('path');
const sequelize = require('../database/connection');

class DbInitService {
  constructor() {
    // Definimos la ruta del script principal de la plataforma
    this.scriptPath = path.join(__dirname, '..', 'database', 'plataforma_db.sql');
  }

  async #ejecutarScriptPorLotesMSSQL(scriptSql) {
    // Dividimos por el comando "GO" que Sequelize/MSSQL Driver no procesan nativamente
    const lotes = scriptSql.split(/^\s*GO\s*$/im);
    let comandosEjecutados = 0;

    for (const lote of lotes) {
      const queryLimpio = lote.trim();
      if (queryLimpio.length > 0) {
        await sequelize.query(queryLimpio);
        comandosEjecutados++;
      }
    }
    return comandosEjecutados;
  }

  async ejecutarScriptBD() {
    try {
      await fs.access(this.scriptPath);
    } catch (err) {
      throw {
        statusCode: 500,
        msg: 'El archivo de script SQL no fue encontrado en el servidor.',
        detalle: this.scriptPath
      };
    }

    const sqlScript = await fs.readFile(this.scriptPath, 'utf-8');
    const totalLotes = await this.#ejecutarScriptPorLotesMSSQL(sqlScript);

    return {
      comandosEjecutados: totalLotes,
      mensaje: `Estructura actualizada: ${totalLotes} lotes procesados.`
    };
  }
}

module.exports = DbInitService;