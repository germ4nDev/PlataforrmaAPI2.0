/*
    Author: Juan Valencia
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getTiposScripts,
    getTipoScriptById,
    createTipoScript,
    updateTipoScript,
    deleteTipoScript,
} = require("../controllers/tipos-scripts");

const router = Router();

router.get("/", getTiposScripts);

router.get("/:id", getTipoScriptById);

router.post("/", createTipoScript);

router.put("/", updateTipoScript);

router.delete("/:id", deleteTipoScript);

module.exports = router;