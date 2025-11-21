// Importaciones simuladas
const { response } = require('express');

// SIMULACIÓN DE LA BASE DE DATOS/MODELO
// En un entorno real, esto sería una conexión a MongoDB, Firestore, etc.
const TokenBlacklist = {
    // Lista de ejemplo de IDs de usuario que han sido revocados
    // En la vida real, almacenarías el JWT ID (JTI) o el propio token.
    revokedUserIds: new Set(),

    /** Agrega un ID de usuario a la lista de revocados. */
    revokeUserSession: function(userId) {
        // En un sistema real, harías una consulta para encontrar TODOS 
        // los tokens activos de ese usuario y los invalidarías.
        // Aquí simulamos que invalidamos su ID completo.
        this.revokedUserIds.add(userId);
        return true;
    },

    /** Verifica si un token o ID de usuario está revocado. */
    isUserRevoked: function(userId) {
        return this.revokedUserIds.has(userId);
    }
};

// =================================================================
// 1. Middleware para Verificar Rol de Administrador (Simulado)
// =================================================================
const verificarRolAdmin = (req, res, next) => {
    // IMPORTANTE: En tu aplicación, esto DEBE verificar el token del 
    // usuario que hace la solicitud y si su rol es 'ADMIN' o similar.
    const usuarioSolicitante = req.usuario; // Suponemos que el middleware de JWT ya lo adjuntó

    if (!usuarioSolicitante || usuarioSolicitante.rol !== 'ADMIN_MASTER') {
        return res.status(403).json({
            ok: false,
            msg: 'Permiso denegado. Se requiere un rol de administrador para esta acción.'
        });
    }
    next();
};

// =================================================================
// 2. Controlador para Revocar la Sesión de un Usuario
// =================================================================
const revocarSesionUsuario = async (req, res = response) => {
    // ID del usuario cuya sesión se quiere cerrar
    const userIdToRevoke = req.params.id; 

    if (!userIdToRevoke) {
        return res.status(400).json({
            ok: false,
            msg: 'Se requiere el ID del usuario cuya sesión se desea cerrar.'
        });
    }

    try {
        // SIMULACIÓN: Invalida el usuario en la lista negra
        TokenBlacklist.revokeUserSession(userIdToRevoke);

        // En un sistema real, aquí podrías registrar la acción en un log de auditoría.

        res.json({
            ok: true,
            msg: `Sesión(es) del usuario ${userIdToRevoke} revocada(s) exitosamente.`,
            // NOTA: El efecto no es inmediato; se verá en la próxima petición del usuario revocado.
        });

    } catch (error) {
        console.error('Error al intentar revocar la sesión:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor al revocar la sesión.'
        });
    }
};

// =================================================================
// 3. Middleware para Chequear la Blacklist (Debería ir DESPUÉS 
//    del middleware de verificación de JWT)
// =================================================================
const checkBlacklist = (req, res, next) => {
    const userId = req.usuario.uid; // Suponemos que el UID del usuario está en el token.

    if (TokenBlacklist.isUserRevoked(userId)) {
        return res.status(401).json({
            ok: false,
            msg: 'Su sesión ha sido revocada. Por favor, inicie sesión nuevamente.'
        });
    }
    next();
};

module.exports = {
    revocarSesionUsuario,
    verificarRolAdmin,
    checkBlacklist
};

/*
 * Uso en tu archivo de rutas (ejemplo):
 * router.delete('/sesiones/revocar/:id', verificarRolAdmin, revocarSesionUsuario);
 * * Uso del middleware de Blacklist (Debe ir en TODAS las rutas protegidas):
 * router.get('/ruta-protegida', middlewareJWT, checkBlacklist, miControlador);
*/