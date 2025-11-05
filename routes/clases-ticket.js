/*
    Author: German Valencia
    Ruta: /api/clasesTcket
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getClasesTicket,
    getClaseTicketById,
    createClaseTicket,
    updateClaseTicket,
    deleteClaseTicket,
} = require("../controllers/clases-ticket");

const router = Router();

router.get("/", getClasesTicket);

router.post("/", createClaseTicket);

router.put("/:id", updateClaseTicket);

router.delete("/:id", deleteClaseTicket);

router.get("/:id", getClaseTicketById);

module.exports = router;