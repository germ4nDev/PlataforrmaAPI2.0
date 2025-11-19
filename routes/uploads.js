/*
    Author: German Valencia
    ruta: api/uploads/
*/
const { Router } = require("express");
const expressFileUpload = require("express-fileupload");
const { validarJWT } = require("../middlewares/validar-jwt");
const { fileUpload, retornaImagen, eliminarArchivo, setUploadFolder } = require("../controllers/uploads");

const router = Router();

router.use(expressFileUpload());

router.put("/:susc/:tipo/:id", fileUpload);

router.get("/folder/:susc", setUploadFolder);

router.get("/:susc/:tipo/:foto", retornaImagen);

router.delete("/delete/:susc/:tipo/:foto", eliminarArchivo);

module.exports = router;
