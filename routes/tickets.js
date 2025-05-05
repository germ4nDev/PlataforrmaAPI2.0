/*
    Author: German Valencia
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

router.post( "/",  validarJWT, createTicketAP);

router.put("/:id",validarJWT, updateTicketAP);

router.delete("/:id", [validarJWT], deleteTicketAP);

router.get("/:id", validarJWT, getTicketsAPById);

module.exports = router;