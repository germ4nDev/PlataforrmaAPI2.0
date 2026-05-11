const sequelize = require('../database/connection');
const PTLPaquetes = require('../models/paquete')(sequelize);
const { io } = require('../index');

const obtenerPaquetes = async () => {
  return await PTLPaquetes.findAll();
};

const obtenerPaquetePorId = async (codigoPaquete) => {
  const paquete = await PTLPaquetes.findOne({
    where: { codigoPaquete },
  });

  if (!paquete) {
    throw { statusCode: 404, msg: "No existe un paquete por ese codigo" };
  }

  return paquete;
};

const crearPaquete = async (data) => {
  const existente = await PTLPaquetes.findOne({
    where: { codigoPaquete: data.codigoPaquete }
  });

  if (existente) {
    throw { statusCode: 400, msg: `El código ${data.codigoPaquete} ya está registrado` };
  }

  const existeNombre = await PTLPaquetes.findOne({
    where: { nombrePaquete: data.nombrePaquete }
  });

  if (existeNombre) {
    throw { statusCode: 400, msg: 'Ya existe un paquete con ese nombre' };
  }

  const nuevo = await PTLPaquetes.create(data);

  if (typeof io !== 'undefined') {
    io.emit('paquetes-actualizados', {
      action: 'create',
      msg: `Paquete creado: ${nuevo.nombrePaquete}`
    });
  } else {
    console.warn('Advertencia: Socket.io (io) no está definido, no se emitió el evento.');
  }

  return nuevo;
};

const actualizarPaquete = async (codigoPaquete, data) => {
  const paqueteOg = await PTLPaquetes.findOne({
    where: { codigoPaquete },
  });

  if (!paqueteOg) {
    throw { statusCode: 404, msg: "No existe un paquete por ese id" }; // Corregido: decía PTLPaquetes
  }

  await PTLPaquetes.update(data, {
    where: { codigoPaquete },
  });

  const paqueteActualizado = await PTLPaquetes.findOne({
    where: { codigoPaquete },
  });

  io.emit('paquetes-actualizados', {
    action: 'update',
    msg: `Paquete actualizado: ${paqueteActualizado.nombrePaquete}` // Corregido typo
  });

  return paqueteActualizado;
};

const eliminarPaquete = async (codigoPaquete) => {
  const paquete = await PTLPaquetes.findOne({
    where: { codigoPaquete },
  });

  if (!paquete) {
    throw { statusCode: 404, msg: "No existe un paquete por ese id" };
  }

  // Usamos el objeto encontrado para sacar el nombre antes de borrarlo
  const nombrePaqueteEliminado = paquete.nombrePaquete;

  const paqueteEliminado = await PTLPaquetes.destroy({
    where: { codigoPaquete }
  });

  io.emit('paquetes-actualizados', {
    action: 'delete',
    msg: `Paquete eliminado: ${nombrePaqueteEliminado}` // Corregido bug de retorno de sequelize
  });

  return paqueteEliminado;
};

module.exports = {
  obtenerPaquetes,
  obtenerPaquetePorId,
  crearPaquete,
  actualizarPaquete,
  eliminarPaquete,
};