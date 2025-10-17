/*
    Author: German Valirncia
    Ruta: /api/seguimientos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getTiposValor,
  getTiposValorById,
  createTkipoValor,
  updateTkipoValor,
  deleteTkipoValor,
} = require("../controllers/tipos-valor");

const router = Router();

router.get("/", getTiposValor);

router.post( "/", createTkipoValor);

router.put("/:id", updateTkipoValor);

router.delete("/:id", deleteTkipoValor);

router.get("/:id", getTiposValorById);

module.exports = router;