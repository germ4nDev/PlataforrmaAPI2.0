/*
    Author: Juan Valencia
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getScripts,
    getScriptById,
    createScript,
    updateScript,
    deleteScript,
} = require("../controllers/scripts");

const router = Router();

router.get("/", getScripts);

router.get("/:id", getScriptById);

router.post("/", createScript);

router.put("/", updateScript);

router.delete("/:id", deleteScript);

module.exports = router;