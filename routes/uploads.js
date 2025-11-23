/*
    Author: German Valencia
    ruta: api/uploads/
*/
const { Router } = require("express");
const expressFileUpload = require("express-fileupload");
const { validarJWT } = require("../middlewares/validar-jwt");
const { fileUpload, retornaImagen, eliminarArchivo, setUploadFolder } = require("../controllers/uploads");

const router = Router();

router.use(expressFileUpload({
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 }, 
}));

router.put("/:susc/:tipo/:id", validarJWT, fileUpload); 

router.get("/folder/:susc", validarJWT, setUploadFolder);

router.get("/:susc/:tipo/:foto", retornaImagen);

router.delete("/delete/:susc/:tipo/:foto", validarJWT, eliminarArchivo);

module.exports = router;