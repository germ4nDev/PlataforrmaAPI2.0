/*
    Author: German Valencia
    Ruta: /api/usuarios-roles
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getSuitesAP,
  getSuitesAPById,
  createSuiteAP,
  updateSuiteAP,
  deleteSuiteAP,
} = require("../controllers/suites-ap");

const router = Router();

router.get("/", validarJWT, getSuitesAP);

router.post( "/", validarJWT, createSuiteAP);

router.put("/:id", validarJWT, updateSuiteAP);

router.delete("/:id", validarJWT, deleteSuiteAP);

router.get("/:id", validarJWT, getSuitesAPById);

module.exports = router;