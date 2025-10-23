/*
    Author: German Valencia
    Ruta: /api/suscriptores
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getPaquetes,
    getPaqueteById,
    createPaquete,
    updatePaquete,
    deletePaquete,
} = require("../controllers/paquetes");

const router = Router();

router.get("/", getPaquetes);

router.post("/", createPaquete);

router.put("/:id", updatePaquete);

router.delete("/:id", deletePaquete);

router.get("/:id", getPaqueteById);

module.exports = router;