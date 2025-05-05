/*
    Author: John Castañeda
    Ruta: /api/contenidos-st
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
    getContenidos,
    getContenidoById,
    createContenido,
    updateContenido,
    deleteContenido,
} = require("../controllers/contenidos-el");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", getContenidos);

router.get("/:id", validarJWT, getContenidoById);

router.post( "/",  validarJWT, createContenido);

router.put("/:id",validarJWT, updateContenido);

router.delete("/:id", [validarJWT], deleteContenido);


module.exports = router;