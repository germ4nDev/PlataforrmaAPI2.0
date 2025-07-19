/*
    Author: German Valencia
    Actualización: John Castañeda
    Ruta: /api/suscriptores
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getTicketsAP,
    getTicketsAPById,
    createTicketAP,
    updateTicketAP,
    deleteTicketAP,
} = require("../controllers/tickets");

const router = Router();

router.get("/", getTicketsAP);

router.post( "/", createTicketAP);

router.put("/:id", updateTicketAP);

router.delete("/:id", deleteTicketAP);

router.get("/:id", getTicketsAPById);

module.exports = router;