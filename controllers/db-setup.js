/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const DbInitService = require("../services/db-script.service");
const service = new DbInitService();

const inicializarBaseDeDatos = async (req, res = response) => {
    try {
        const respuesta = await service.ejecutarScriptBD();
        res.status(200).json({
            ok: true,
            respuesta
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            ok: false,
            msg: error.msg || "Error crítico al inicializar la base de datos",
            error: error.detalle || null
        });
    }
};

module.exports = {
    inicializarBaseDeDatos
};