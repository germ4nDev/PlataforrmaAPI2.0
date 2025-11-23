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

router.get("/", validarJWT, getTextosID);

router.get("/:id", validarJWT, validarJWT, getTextosIDById);

router.post( "/", validarJWT,  validarJWT, createTextoID);

router.put("/:id", validarJWT,validarJWT, updateTextoID);

router.delete("/:id", validarJWT, [validarJWT], deleteTextoID);

module.exports = router;