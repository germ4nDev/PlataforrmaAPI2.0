const sequelize = require('../database/connection');
const PTLUsuariosSC = require('../models/usuario-sc')(sequelize);
const { io } = require('../index');

const obtenerUsuariosSC = async () => {
  return await PTLUsuariosSC.findAll();
};

const obtenerUsuarioSCPorId = async (codigoUsuarioSC) => {
  const usuarioSC = await PTLUsuariosSC.findOne({
    where: { codigoUsuarioSC } // Corregido: antes usaba .findById()
  });

  if (!usuarioSC) {
    throw { statusCode: 404, msg: "No existe un usuario por ese id" };
  }

  return usuarioSC;
};

const obtenerUsuariosSCPorCodigoSuscriptor = async (codigoSuscriptor) => {
  const usuariosSC = await PTLUsuariosSC.findAll({
    where: { codigoSuscriptor } // Corregido typo 'codigoSusucirptor'
  });

  // findAll siempre devuelve un array (vacío si no hay resultados)
  if (!usuariosSC || usuariosSC.length === 0) {
    throw { statusCode: 404, msg: "No existen usuarios para ese suscriptor" };
  }

  return usuariosSC;
};

const crearUsuarioSC = async (data) => {
  const nuevo = await PTLUsuariosSC.create(data);

  io.emit("usuarios-sc-actualizados", {
    action: "create",
    msg: `Usuario Suscriptor creado: ${nuevo.codigoUsuarioSC}`,
  });

  return nuevo;
};

const actualizarUsuarioSC = async (codigoUsuarioSC, data) => {
  const usuarioSCDB = await PTLUsuariosSC.findOne({
    where: { codigoUsuarioSC },
  });

  if (!usuarioSCDB) {
    throw { statusCode: 404, msg: "No existe un usuario por ese codigo" };
  }

  await PTLUsuariosSC.update(data, {
    where: { codigoUsuarioSC },
  });

  const usuarioSCActualizado = await PTLUsuariosSC.findOne({
    where: { codigoUsuarioSC },
  });

  io.emit('usuarios-sc-actualizados', { // Corregido: emitía a 'usuarios-empresas'
    action: 'update',
    msg: `Usuario Suscriptor actualizado: ${usuarioSCActualizado.codigoUsuarioSC}`
  });

  return usuarioSCActualizado;
};

const eliminarUsuarioSC = async (codigoUsuarioSC) => {
  const usuarioSCDB = await PTLUsuariosSC.findOne({
    where: { codigoUsuarioSC },
  });

  if (!usuarioSCDB) {
    throw { statusCode: 404, msg: "No existe un usuarioSC con ese ID" };
  }

  // Guardamos el código antes de eliminar para el socket
  const codigoEliminado = usuarioSCDB.codigoUsuarioSC;

  const usuarioSCEliminado = await PTLUsuariosSC.destroy({
    where: { codigoUsuarioSC },
  });

  io.emit('usuarios-sc-actualizados', { // Corregido: emitía a 'usuarios-empresas'
    action: 'delete',
    msg: `Usuario Suscriptor eliminado: ${codigoEliminado}` // Corregido bug undefined
  });

  return usuarioSCEliminado; // Cantidad de filas afectadas
};

module.exports = {
  obtenerUsuariosSC,
  obtenerUsuarioSCPorId,
  obtenerUsuariosSCPorCodigoSuscriptor,
  crearUsuarioSC,
  actualizarUsuarioSC,
  eliminarUsuarioSC,
};