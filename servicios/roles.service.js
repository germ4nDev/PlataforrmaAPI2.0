const sequelize = require('../database/connection');
const PTLRolesAP = require('../models/role')(sequelize);
const { io } = require('../index');

const obtenerRoles = async () => {
  return await PTLRolesAP.findAll();
};

const obtenerRolePorId = async (codigoRole) => {
  const role = await PTLRolesAP.findOne({
    where: { codigoRole },
  });

  if (!role) {
    throw { statusCode: 404, msg: "No existe un role por ese id" };
  }

  return role;
};

const obtenerRolesPorCodigoApp = async (codigoAplicacion) => {
  return await PTLRolesAP.findAll({
    where: { codigoAplicacion },
  });
};

const crearRole = async (data) => {
  const roleDB = await PTLRolesAP.create(data);

  io.emit('roles-actualizados', {
    action: 'create',
    msg: `Role creado: ${roleDB.nombreRole}`
  });

  return roleDB;
};

const actualizarRole = async (codigoRole, data) => {
  const roleDB = await PTLRolesAP.findOne({
    where: { codigoRole }
  });

  if (!roleDB) {
    throw { statusCode: 404, msg: 'No existe un role con ese ID' };
  }

  await PTLRolesAP.update(data, {
    where: { codigoRole }
  });

  const roleActualizado = await PTLRolesAP.findOne({
    where: { codigoRole }
  });

  io.emit('roles-actualizados', {
    action: 'update',
    msg: `Role actualizado: ${roleActualizado.nombreRole}`
  });

  return roleActualizado;
};

const eliminarRole = async (codigoRole) => {
  const roleDB = await PTLRolesAP.findOne({
    where: { codigoRole }
  });

  if (!roleDB) {
    throw { statusCode: 404, msg: 'No existe un role con ese ID' };
  }

  // Guardamos el nombre antes de borrarlo de la base de datos
  const nombreRoleEliminado = roleDB.nombreRole;

  const roleEliminado = await PTLRolesAP.destroy({
    where: { codigoRole }
  });

  io.emit('roles-actualizados', {
    action: 'delete',
    msg: `Role eliminado: ${nombreRoleEliminado}` // Corregido el typo "emiminado" y el bug del undefined
  });

  return roleEliminado; // Retorna el número de filas afectadas (generalmente 1)
};

module.exports = {
  obtenerRoles,
  obtenerRolePorId,
  obtenerRolesPorCodigoApp,
  crearRole,
  actualizarRole,
  eliminarRole,
};