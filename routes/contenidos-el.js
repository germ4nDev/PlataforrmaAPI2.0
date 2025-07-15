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

const router = Router();

router.get("/", getContenidos);

router.get("/:id", getContenidoById);

router.post( "/", createContenido);

router.put("/:id", updateContenido);

router.delete("/:id", deleteContenido);


module.exports = router;