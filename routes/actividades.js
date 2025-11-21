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

router.get("/", getActividades);

router.get("/:id", getActividadById);

router.get("/app/:id", getActividadByCodeApp);

router.get("/suite/:id", getActividadByCodeSuite);

router.get("/modulo/:id", getActividadByCodeModulo);

router.post("/", createActividad);

router.put("/:id", updateActividad);

router.delete("/:id", deleteActividad);

module.exports = router;
