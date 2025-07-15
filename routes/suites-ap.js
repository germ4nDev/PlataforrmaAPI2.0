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

router.get("/", getSuitesAP);

router.post( "/", createSuiteAP);

router.put("/:id", updateSuiteAP);

router.delete("/:id", deleteSuiteAP);

router.get("/:id", getSuitesAPById);

module.exports = router;