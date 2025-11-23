/*
    Author: German Valencia
    Ruta: /api/actividades
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getActividades,
  getActividadById,
  getActividadByCodeApp,
  getActividadByCodeSuite,
  getActividadByCodeModulo,
  createActividad,
  updateActividad,
  deleteActividad,
} = require("../controllers/actividades");

const router = Router();

router.get("/", validarJWT, getActividades);

router.get("/:id", validarJWT, getActividadById);

router.get("/app/:id", validarJWT, getActividadByCodeApp);

router.get("/suite/:id", validarJWT, getActividadByCodeSuite);

router.get("/modulo/:id", validarJWT, getActividadByCodeModulo);

router.post("/", validarJWT, createActividad);

router.put("/:id", validarJWT, updateActividad);

router.delete("/:id", validarJWT, deleteActividad);

module.exports = router;
