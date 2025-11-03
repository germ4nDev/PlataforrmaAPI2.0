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

router.get("/", getTiposLogs);

router.post( "/", createTipoLog);

router.put("/:id", updateTipoLog);

router.delete("/:id", deleteTipoLog);

router.get("/:id", getTipoLogById);

module.exports = router;