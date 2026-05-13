const sequelize = require("../database/connection");
const PTLUsuariosRole = require("../models/usuario-role")(sequelize);
// IMPORTANTE: Importamos los modelos que faltaban para las transacciones
const PTLRolesAP = require("../models/role")(sequelize);
const PTLUsuarios = require("../models/usuario")(sequelize);
const { io } = require("../index");

const obtenerUsuariosRoles = async () => {
  return await PTLUsuariosRole.findAll();
};

const obtenerUsuarioRolePorId = async (usuarioRoleId) => {
  const usuarioRole = await PTLUsuariosRole.findOne({
    where: { usuarioRoleId },
  });

  if (!usuarioRole) {
    throw { statusCode: 404, msg: "No existe un usuarioRole por ese id" };
  }

  return usuarioRole;
};

const obtenerUsuariosPorCodigoRol = async (codigoRole) => {
  return await PTLUsuariosRole.findAll({
    where: { codigoRole }
  });
};

const obtenerRolesPorCodigoUsuario = async (codigoUsuarioSC) => {
  return await PTLUsuariosRole.findAll({
    where: { codigoUsuarioSC }
  });
};

const crearUsuarioRole = async (data) => {
  const nuevo = await PTLUsuariosRole.create(data);

  io.emit("usuarios-roles-actualizados", {
    action: "create",
    msg: `Usuario Role creado`,
  });

  return nuevo;
};

const actualizarUsuarioRole = async (codigoRole, datosRol, usuariosSeleccionados) => {
  const t = await sequelize.transaction();

  try {
    // 1. Actualizar los datos básicos del Rol
    await PTLRolesAP.update(datosRol, {
      where: { codigoRole },
      transaction: t
    });

    // 2. ELIMINAR las asociaciones actuales para este rol
    await PTLUsuariosRole.destroy({
      where: { codigoRole },
      transaction: t
    });

    // 3. INSERTAR las nuevas asociaciones seleccionadas
    if (usuariosSeleccionados && usuariosSeleccionados.length > 0) {
      const nuevasAsociaciones = usuariosSeleccionados.map(codUser => ({
        codigoRole: codigoRole,
        codigoUsuarioSC: codUser,
        codigoEmpresaSC: datosRol.codigoEmpresaSC || '',
        codigoAplicacion: datosRol.codigoAplicacion,
        codigoSuite: datosRol.codigoSuite,
        tipoRol: datosRol.tipoRol,
        estadoUsuarioRole: true,
        codigoUsuarioCreacion: datosRol.usuarioModificacion,
        fechaCreacion: new Date().toISOString(),
        codigoUsuarioModificacion: datosRol.usuarioModificacion,
        fechaModificacion: new Date().toISOString()
      }));

      await PTLUsuariosRole.bulkCreate(nuevasAsociaciones, { transaction: t });
    }

    await t.commit();

    io.emit("usuarios-roles-actualizados", {
      action: "update",
      msg: `Rol y sus usuarios actualizados`,
    });

    return { msg: 'Rol y usuarios actualizados correctamente' };
  } catch (error) {
    await t.rollback();
    throw { statusCode: 500, msg: 'Error al actualizar rol y usuarios', error: error.message };
  }
};

const actualizarUsuarioRoles = async (codigoUsuario, datosUsuario, rolesSeleccionados) => {
  const t = await sequelize.transaction();

  try {
    await PTLUsuarios.update(datosUsuario, {
      where: { codigoUsuario },
      transaction: t
    });

    await PTLUsuariosRole.destroy({
      where: { codigoUsuarioSC: codigoUsuario },
      transaction: t
    });

    if (rolesSeleccionados && rolesSeleccionados.length > 0) {
      const nuevasAsociaciones = rolesSeleccionados.map(rol => ({
        codigoUsuarioSC: codigoUsuario,
        codigoRole: rol.codigoRole,
        codigoEmpresaSC: '',
        codigoAplicacion: rol.codigoAplicacion,
        codigoSuite: rol.codigoSuite,
        tipoRol: rol.tipoRol || 'Suscriptor', // Corregido typo 'Suscritor'
        estadoUsuarioRole: true,
        codigoUsuarioCreacion: datosUsuario.codigoUsuarioModificacion,
        fechaCreacion: new Date().toISOString(),
        codigoUsuarioModificacion: datosUsuario.codigoUsuarioModificacion,
        fechaModificacion: new Date().toISOString()
      }));

      await PTLUsuariosRole.bulkCreate(nuevasAsociaciones, { transaction: t });
    }

    await t.commit();

    io.emit("usuarios-roles-actualizados", {
      action: "update",
      msg: `Usuario y sus roles actualizados`,
    });

    return { msg: 'Usuario y roles actualizados correctamente' };
  } catch (error) {
    await t.rollback();
    throw { statusCode: 500, msg: 'Error al actualizar el usuario y sus roles', error: error.message };
  }
};

const eliminarUsuarioRole = async (usuarioRoleId) => {
  const usuarioRoleDB = await PTLUsuariosRole.findOne({
    where: { usuarioRoleId },
  });

  if (!usuarioRoleDB) {
    throw { statusCode: 404, msg: "No existe un usuarioRole por ese id" };
  }

  const usuarioRoleDBEliminado = await PTLUsuariosRole.destroy({
    where: { usuarioRoleId },
  });

  io.emit("usuarios-roles-actualizados", {
    action: "delete",
    msg: `Usuario Role eliminado`,
  });

  return usuarioRoleDBEliminado;
};

const eliminarTodosUsuariosRolePorRol = async (codigoRole) => {
  const eliminados = await PTLUsuariosRole.destroy({
    where: { codigoRole }
  });
  return eliminados;
};

const eliminarRolesPorUsuario = async (codigoUsuarioSC) => {
  const eliminados = await PTLUsuariosRole.destroy({
    where: { codigoUsuarioSC }
  });
  return eliminados;
};

module.exports = {
  obtenerUsuariosRoles,
  obtenerUsuarioRolePorId,
  obtenerUsuariosPorCodigoRol,
  obtenerRolesPorCodigoUsuario,
  crearUsuarioRole,
  actualizarUsuarioRole,
  actualizarUsuarioRoles,
  eliminarUsuarioRole,
  eliminarTodosUsuariosRolePorRol,
  eliminarRolesPorUsuario
};