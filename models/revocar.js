/*
    Author: German Valencia
    Refactored for: QPLUS Architecture - Auth & Security Flow
*/
const { response } = require('express');

const TokenBlacklistService = {
    revokedUserIds: new Set(),

    revokeSession: function (userId) {
        this.revokedUserIds.add(userId.toString());
        return true;
    },

    isRevoked: function (userId) {
        return this.revokedUserIds.has(userId.toString());
    }
};

/**
 * Middleware: Verifica que el usuario tenga el rol de administrador.
 * Dependencia: Requiere que el middleware de JWT se ejecute antes.
 */
const verificarRolAdmin = (req, res = response, next) => {
    const usuarioSolicitante = req.usuario;

    if (!usuarioSolicitante) {
        return res.status(500).json({
            ok: false,
            msg: 'Se intentó verificar el rol sin validar el token primero.'
        });
    }

    if (usuarioSolicitante.rol !== 'ADMIN_MASTER') {
        return res.status(403).json({
            ok: false,
            msg: 'Acceso denegado. Se requiere un rol de administrador para esta acción.'
        });
    }

    next();
};

/**
 * Middleware: Verifica si la sesión del usuario ha sido revocada.
 * Dependencia: Requiere que el middleware de JWT se ejecute antes.
 */
const checkBlacklist = (req, res = response, next) => {
    const userId = req.usuario?.uid || req.uid;

    if (!userId) {
        return res.status(500).json({
            ok: false,
            msg: 'No se pudo identificar al usuario para validar la sesión.'
        });
    }

    if (TokenBlacklistService.isRevoked(userId)) {
        return res.status(401).json({
            ok: false,
            msg: 'Su sesión ha sido revocada por un administrador. Por favor, inicie sesión nuevamente.'
        });
    }

    next();
};

/**
 * Controlador: Revoca la sesión activa de un usuario específico.
 */
const revocarSesionUsuario = async (req, res = response) => {
    const userIdToRevoke = req.params.id;

    if (!userIdToRevoke) {
        return res.status(400).json({
            ok: false,
            msg: 'El ID del usuario es obligatorio para revocar la sesión.'
        });
    }

    try {
        TokenBlacklistService.revokeSession(userIdToRevoke);

        // TODO (QPLUS): Aquí podrías insertar un registro en PTLLogActividadesAP
        // detallando qué administrador revocó a qué usuario.

        res.json({
            ok: true,
            msg: `Las sesiones del usuario con ID ${userIdToRevoke} han sido revocadas exitosamente.`
        });

    } catch (error) {
        console.error('Error en revocarSesionUsuario:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor al intentar revocar la sesión. Contacte al soporte.'
        });
    }
};

module.exports = {
    verificarRolAdmin,
    checkBlacklist,
    revocarSesionUsuario
};