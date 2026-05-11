const sequelize = require('../database/connection');
const PTLItemsPaquete = require('../models/item-paquete')(sequelize);
const { io } = require('../index');

const obtenerItemsPaquete = async () => {
  return await PTLItemsPaquete.findAll();
};

const obtenerItemPaquetePorId = async (codigoItem) => {
  const itemPaquete = await PTLItemsPaquete.findOne({
    where: { codigoItem },
  });

  if (!itemPaquete) {
    throw { statusCode: 404, msg: "No existe un itemPaquete con ese id" };
  }

  return itemPaquete;
};

const obtenerItemsPaquetePorCodigo = async (codigoPaquete) => {
  const itemsPaquete = await PTLItemsPaquete.findAll({
    where: { codigoPaquete },
  });

  if (!itemsPaquete || itemsPaquete.length === 0) {
    throw { statusCode: 404, msg: "No existen itemsPaquete para ese código de paquete" };
  }

  return itemsPaquete;
};

const crearItemPaquete = async (data) => {
  const existente = await PTLItemsPaquete.findOne({
    where: { codigoItem: data.codigoItem }
  });

  if (existente) {
    throw { statusCode: 400, msg: `El código ${data.codigoItem} ya está registrado` };
  }

  const nuevo = await PTLItemsPaquete.create(data);

  if (typeof io !== 'undefined') {
    io.emit('items-paquete-actualizados', {
      action: 'create',
      msg: `Item Paquete creado: ${nuevo.codigoItem}`
    });
  } else {
    console.warn('Advertencia: Socket.io (io) no está definido, no se emitió el evento.');
  }

  return nuevo;
};

const actualizarItemPaquete = async (codigoItem, data) => {
  const itemsPaqueteOg = await PTLItemsPaquete.findOne({
    where: { codigoItem },
  });

  if (!itemsPaqueteOg) {
    throw { statusCode: 404, msg: "No existe un itemPaquete con ese id" };
  }

  await PTLItemsPaquete.update(data, {
    where: { codigoItem },
  });

  const itemsPaqueteActualizado = await PTLItemsPaquete.findOne({
    where: { codigoItem },
  });

  io.emit('items-paquete-actualizados', {
    action: 'update',
    msg: `Item actualizado: ${itemsPaqueteActualizado.nombreItem}`
  });

  return itemsPaqueteActualizado;
};

const eliminarItemPaquete = async (codigoItem) => {
  const itemPaquete = await PTLItemsPaquete.findOne({
    where: { codigoItem },
  });

  if (!itemPaquete) {
    throw { statusCode: 404, msg: "No existe un itemPaquete con ese id" };
  }

  const itemsPaqueteEliminado = await PTLItemsPaquete.destroy({
    where: { codigoItem },
  });

  io.emit('items-paquete-actualizados', {
    action: 'delete',
    msg: `Item eliminado: ${itemPaquete.nombreItem}`
  });

  return itemsPaqueteEliminado;
};

module.exports = {
  obtenerItemsPaquete,
  obtenerItemPaquetePorId,
  obtenerItemsPaquetePorCodigo,
  crearItemPaquete,
  actualizarItemPaquete,
  eliminarItemPaquete,
};