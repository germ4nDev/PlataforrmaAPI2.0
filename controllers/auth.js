/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const AuthService = require("../services/auth.service");
const service = new AuthService();

const login = async (req, res = response) => {
  try {
    const { username, password } = req.body;

    const { usuario, token } = await service.login(username, password);

    return res.status(200).json({
      ok: true,
      token,
      usuario,
    });
  } catch (error) {
    console.error('Error en login:', error);
    if (error.statusCode) {
      // Retorna 404 o 401 según lo que haya lanzado el servicio
      return res.status(error.statusCode).json({ ok: false, msg: error.msg });
    }
    res.status(500).json({ ok: false, msg: "Error de sistema, Hable con el administrador" });
  }
};

const verificaarClaveActual = async (req, res = response) => {
  try {
    console.log('Verificando clave Usuario', req.body);
    const { username, password } = req.body;

    const usuario = await service.verificarClave(username, password);

    console.log('Usuario Encontrado', usuario);
    return res.status(200).json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.error('Error en verificar clave:', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json({ ok: false, msg: error.msg });
    }
    res.status(500).json({ ok: false, msg: "Error de sistema, Hable con el administrador" });
  }
};

const renewToken = async (req, res = response) => {
  try {
    const uid = req.uid; // Asumiendo que viene de un middleware previo que valida el JWT

    const { usuario, token } = await service.renovarToken(uid);

    return res.status(200).json({
      ok: true,
      token,
      usuario
    });
  } catch (error) {
    console.error('Error en renewToken:', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json({ ok: false, msg: error.msg });
    }
    res.status(500).json({ ok: false, msg: "Error de sistema, Hable con el administrador" });
  }
};

const verificarUserInRole = async (req, res = response) => {
  try {
    const { role, usuario } = req.body;

    // La lógica de verificación ya está purificada y arreglada en el servicio
    const isRole = service.verificarRol(usuario.roles, role);

    return res.status(200).json({
      ok: true,
      isRole,
    });
  } catch (error) {
    console.error('Error en verificarUserInRole:', error);
    res.status(500).json({ ok: false, msg: "Error interno al verificar el rol" });
  }
};

module.exports = {
  login,
  renewToken,
  verificaarClaveActual,
  verificarUserInRole,
};