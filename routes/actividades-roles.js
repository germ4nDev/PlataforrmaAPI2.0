/*
    Author: German Valencia
    Ruta: /api/actividades
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getActividadesRoles,
  getActividadByCodeActividad,
  getActividadByCodeRole,
  createActividadRole,
  updateActividadRole,
  deleteActividadRole,
} = require("../controllers/actividades-roles");

const router = Router();

router.get("/", getActividadesRoles);

router.get("/acti/:ac", getActividadByCodeActividad);

router.get("/role/:ro", getActividadByCodeRole);

router.post("/", createActividadRole);

router.put("/:id:", updateActividadRole);

router.delete("/:ac/:do", deleteActividadRole);

module.exports = router;