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

router.get("/", validarJWT, getActividadesRoles);

router.get("/acti/:ac", validarJWT, getActividadByCodeActividad);

router.get("/role/:ro", validarJWT, getActividadByCodeRole);

router.post("/", validarJWT, createActividadRole);

router.put("/:id:", validarJWT, updateActividadRole);

router.delete("/:ac/:do", validarJWT, deleteActividadRole);

module.exports = router;