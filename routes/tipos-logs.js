/*
    Author: German Valirncia
    Ruta: /api/seguimientos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getTiposLogs,
  getTipoLogById,
  createTipoLog,
  updateTipoLog,
  deleteTipoLog,
} = require("../controllers/tipos-logs");

const router = Router();

router.get("/", validarJWT, getTiposLogs);

router.post( "/", validarJWT, createTipoLog);

router.put("/:id", validarJWT, updateTipoLog);

router.delete("/:id", validarJWT, deleteTipoLog);

router.get("/:id", validarJWT, getTipoLogById);

module.exports = router;