/*
    Author: John Castañeda
    Ruta: /api/suscriptores-pq
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getSuscriptoresPQ,
    getSuscriptoresPQById,
    createSuscriptorPQ,
    updateSuscriptorPQ,
    deleteSuscriptorPQ,
} = require("../controllers/suscriptores-pq");

const router = Router();

router.get("/", getSuscriptoresPQ);

router.get("/:id", validarJWT, getSuscriptoresPQById);

router.post( "/",  validarJWT, createSuscriptorPQ);

router.put("/:id",validarJWT, updateSuscriptorPQ);

router.delete("/:id", [validarJWT], deleteSuscriptorPQ);

module.exports = router;