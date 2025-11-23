/*
    Author: German Valencia
    Ruta: /api/items paquetes
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getItemsPaquete,
    getItemsPaqueteById,
    createItemsPaquete,
    updateItemsPaquete,
    deleteItemsPaquete,
} = require("../controllers/items-paquete");

const router = Router();

router.get("/", validarJWT, getItemsPaquete);

router.post("/", validarJWT, createItemsPaquete);

router.put("/:id", validarJWT, updateItemsPaquete);

router.delete("/:id", validarJWT, deleteItemsPaquete);

router.get("/:id", validarJWT, getItemsPaqueteById);

module.exports = router;