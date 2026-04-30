/*
    Author: German Valencia
    Ruta: /api/clasesTcket
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getTipoGaleria,
  getTipoGaleriaById,
  createTipoGaleria,
  updateTipoGaleria,
  deleteTipoGaleria,
} = require("../controllers/tiposGaleria");

const router = Router();

router.get("/", validarJWT, getTipoGaleria);

router.post("/", validarJWT, createTipoGaleria);

router.put("/:id", validarJWT, updateTipoGaleria);

router.delete("/:id", validarJWT, deleteTipoGaleria);

router.get("/:id", validarJWT, getTipoGaleriaById);

module.exports = router;
