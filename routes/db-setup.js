/*
    Author: German Valencia
    Ruta: /api/db-setup
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  runDBScript,
} = require("../controllers/db-setup");

const router = Router();

router.get("/", runDBScript);

module.exports = router;