/*
    Author: German Valencia
    Ruta: /api/auth
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  login,
  renewToken,
  verificaarClaveActual,
  verificarUserInRole,
} = require("../controllers/auth");

const router = Router();

router.post("/", login);

router.post("/role", verificarUserInRole);

router.post("/compare", verificaarClaveActual);

router.get("/renew", renewToken);

module.exports = router;
