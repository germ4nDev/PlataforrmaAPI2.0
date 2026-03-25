/*
    Author: German Valencia
    Ruta: /api/items paquetes
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getModulosPaquete,
  getModulosPaqueteById,
  getModulosPaqueteByCode,
  createModulosPaquete,
  updateModulosPaquete,
  deleteModulosPaquete,
} = require("../controllers/modulos-paquete");

const router = Router();

router.get("/", validarJWT, getModulosPaquete);

router.post("/", validarJWT, createModulosPaquete);

router.put("/:id", validarJWT, updateModulosPaquete);

router.delete("/:id", validarJWT, deleteModulosPaquete);

router.get("/:id", validarJWT, getModulosPaqueteById);

router.get("/code/:code", validarJWT, getModulosPaqueteByCode);

module.exports = router;