/*
    Author: German Valencia
    ruta: api/uploads/
*/
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    uploadResource,
    showResource,
    deleteResource,
    clearCategoryFolder
} = require("../controllers/uploads");

const router = Router();

router.post("/:suscriptorId/:type", [validarJWT], uploadResource);

router.get("/:suscriptorId/:type/:fileName", showResource);

router.delete("/:suscriptorId/:type/:fileName", [validarJWT], deleteResource);

router.delete("/file/:suscriptorId/:type/:fileName", [validarJWT], deleteResource);

router.delete("/clear/:suscriptorId/:type", [validarJWT], clearCategoryFolder);

module.exports = router;