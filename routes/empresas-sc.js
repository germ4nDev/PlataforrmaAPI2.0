/*
    Author: German Valencia
    Actualización: John Castañeda
    Ruta: /api/empresas-cs
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getEmpresasSC,
  getEmpresaSCById,
  createEmpresaSC,
  updateEmpresaSC,
  deleteEmpresaSC,
} = require("../controllers/empresas-sc");

const router = Router();

router.get("/", getEmpresasSC);

router.post( "/", createEmpresaSC);

router.put("/:id", updateEmpresaSC);

router.delete("/:id", deleteEmpresaSC);

router.get("/:id", getEmpresaSCById);

module.exports = router;