// /*
//     Author: German Valencia
// */
// // const { response } = require("express");
// const { generarJWT } = require("../helpers/jwt");
// const bcrypt = require("bcryptjs");
// const sequelize = require('../database/connection');
// const PTLUsuarios = require('../models/usuario')(sequelize);
// const { io } = require('../index');

// const login = async (req, res = response) => {
//   const dataUser = req.body;
//   try {
//     const usuarioDB = await PTLUsuarios.findOne({
//       where: {
//         userNameUsuario: dataUser.username
//       }
//     });
//     if (!usuarioDB) {
//       res.json({
//         ok: false,
//         msg: "UserName no encontrado",
//       });
//     } else {
//       // const salt = bcrypt.genSaltSync();
//       // const password = await bcrypt.hash(dataUser.password, salt);
//       const isMatch = await bcrypt.compare(dataUser.password, usuarioDB.claveUsuario);
//       if (isMatch) {
//         const token = await generarJWT(usuarioDB.codigoUsuairo, usuarioDB.userNameUsuario, usuarioDB.correoUsuario);
//         io.emit('autenticaciones-actualizadas', {
//           action: 'login',
//           msg: `Login exitoso: ${usuarioDB.codigoUsuairo}`
//         });
//         res.json({
//           ok: true,
//           token,
//           usuario: usuarioDB,
//         });
//       } else {
//         return res.json({
//           ok: false,
//           msg: "Contraseña no válida",
//         });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       ok: false,
//       msg: "Error de sistema, Hable con el administrador",
//     });
//   }
// };

// const verificarUserInRole = async (req, res = response) => {
//   const { role, usuario } = req.body;
//   const roles = usuario.roles;
//   const exidRole = roles.filter((x) => x.nombre === role);
//   const boolEciste = false;
//   if (exidRole) {
//     boolExiste = true;
//   } else {
//     boolExiste = false;
//   }

//   res.json({
//     ok: true,
//     isRole: boolExiste,
//   });
// };

// const verificaarClaveActual = async (req, res = response) => {
//   console.log('login Usuario', req.body);
//   const dataUser = req.body;
//   try {
//     const usuarioDB = await PTLUsuarios.findOne({
//       where: {
//         userNameUsuario: dataUser.username
//       }
//     });
//     if (!usuarioDB) {
//       res.json({
//         ok: false,
//         msg: "UserName no encontrado",
//       });
//     } else {
//       console.log('Usuario Encontrado', usuarioDB);

//       const isMatch = await bcrypt.compare(dataUser.password, usuarioDB.claveUsuario);

//       if (isMatch) {
//         res.json({
//           ok: true,
//           usuario: usuarioDB,
//         });
//       } else {
//         return res.json({
//           ok: false,
//           msg: "Contraseña no válida",
//         });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       ok: false,
//       msg: "Error de sistema, Hable con el administrador",
//     });
//   }
// };

// const renewToken = async (req, res = response) => {
//   const uid = req.uid;
//   const token = await generarJWT(uid);
//   const usuario = await Usuario.findById(uid);

//   res.json({
//     ok: true,
//     token,
//     usuario
//   });
// };

// module.exports = {
//   login,
//   renewToken,
//   verificaarClaveActual,
//   verificarUserInRole,
// };
/*
    Author: German Valencia
*/
const { response } = require("express");
const authService = require("../services/auth.service");

const login = async (req, res = response) => {
  try {
    const { username, password } = req.body;

    // Llamamos al servicio
    const { usuario, token } = await authService.login(username, password);

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

    const usuario = await authService.verificarClave(username, password);

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

    const { usuario, token } = await authService.renovarToken(uid);

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
    const isRole = authService.verificarRol(usuario.roles, role);

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