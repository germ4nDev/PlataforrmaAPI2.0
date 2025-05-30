/*
    Author: German Valencia
    Ruta: /api/textos-id
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getTextosID,
  getTextosIDById,
  createTextoID,
  updateTextoID,
  deleteTextoID,
} = require("../controllers/textos-id");

const router = Router();

router.get("/", getTextosID);

router.get("/:id", validarJWT, getTextosIDById);

router.post( "/",  validarJWT, createTextoID);

router.put("/:id",validarJWT, updateTextoID);

router.delete("/:id", [validarJWT], deleteTextoID);

module.exports = router;