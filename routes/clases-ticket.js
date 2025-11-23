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

router.get("/", validarJWT, getClasesTicket);

router.post("/", validarJWT, createClaseTicket);

router.put("/:id", validarJWT, updateClaseTicket);

router.delete("/:id", validarJWT, deleteClaseTicket);

router.get("/:id", validarJWT, getClaseTicketById);

module.exports = router;