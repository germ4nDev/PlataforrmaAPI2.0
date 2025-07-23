/*
    Author: John Castañeda
    Ruta: /api/seguimientos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getServidores,
    getServidorById,
    createServidor,
    updateServidor,
    deleteServidor,
} = require("../controllers/servidores");

const router = Router();

router.get("/", getServidores);

router.post( "/", createServidor);

router.put("/:id", updateServidor);

router.delete("/:id", deleteServidor);

router.get("/:id", getServidorById);

module.exports = router;