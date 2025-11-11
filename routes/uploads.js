/*
    Author: German Valencia
    ruta: api/uploads/
*/
const { Router } = require("express");
const expressFileUpload = require("express-fileupload");
const { validarJWT } = require("../middlewares/validar-jwt");
const { fileUpload, retornaImagen, eliminarArchivo } = require("../controllers/uploads");

const router = Router();

router.use(expressFileUpload());

router.put("/:tipo/:id", fileUpload);

router.get("/:tipo/:foto", retornaImagen);

router.delete("/delete/:tipo/:foto", eliminarArchivo);

module.exports = router;
