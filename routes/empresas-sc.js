/*
    Author: German Valencia
    Ruta: /api/empresas-st
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

router.post( "/",  validarJWT, createEmpresaSC);

router.put("/:id",validarJWT, updateEmpresaSC);

router.delete("/:id", [validarJWT], deleteEmpresaSC);

router.get("/:id", validarJWT, getEmpresaSCById);

module.exports = router;