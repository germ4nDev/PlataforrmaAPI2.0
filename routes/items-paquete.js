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

router.get("/", getItemsPaquete);

router.post("/", createItemsPaquete);

router.put("/:id", updateItemsPaquete);

router.delete("/:id", deleteItemsPaquete);

router.get("/:id", getItemsPaqueteById);

module.exports = router;