const sequelize = require('../database/connection');
const PTLModulosPaquete = require('../models/modulo-paquete')(sequelize);
const { io } = require('../index');

const obtenerModulosPaquete = async () => {
  return await PTLModulosPaquete.findAll();
};

const obtenerModulosPaquetePorId = async (codigoModulo) => {
  const modulosPaquete = await PTLModulosPaquete.findOne({
    where: { codigoModulo },
  });

  if (!modulosPaquete) {
    throw { statusCode: 404, msg: "No existe un modulosPaquete con ese id" };
  }

  return modulosPaquete;
};

const obtenerModulosPaquetePorCodigo = async (codigoPaquete) => {
  const modulosPaquete = await PTLModulosPaquete.findAll({
    where: { codigoPaquete },
  });

  if (!modulosPaquete || modulosPaquete.length === 0) {
    throw { statusCode: 404, msg: "No existe un modulosPaquete por ese código" };
  }

  return modulosPaquete;
};

const crearModulosPaquete = async (data) => {
  // 1. Buscamos si ya existen registros previos
  const existente = await PTLModulosPaquete.findAll({
    where: {
      codigoPaquete: data.codigoPaquete,
      codigoAplicacion: data.codigoAplicacion,
      codigoSuite: data.codigoSuite,
    }
  });

  // 2. Eliminamos los existentes usando for...of para respetar el async/await
  if (existente.length > 0) {
    for (const mod of existente) {
      await PTLModulosPaquete.destroy({
        where: { codigoModuloPQ: mod.codigoModuloPQ }
      });
    }
  }

  // 3. Creamos los nuevos registros usando for...of
  if (data.modulos && Array.isArray(data.modulos)) {
    for (const mod of data.modulos) {
      await PTLModulosPaquete.create(mod);
    }
  }

  // 4. Obtenemos los registros recién creados
  const nuevos = await PTLModulosPaquete.findAll({
    where: {
      codigoPaquete: data.codigoPaquete,
      codigoAplicacion: data.codigoAplicacion,
      codigoSuite: data.codigoSuite,
    }
  });

  // 5. Emitimos el evento de Socket.io
  if (typeof io !== 'undefined') {
    io.emit('modulos-paquete-actualizados', {
      action: 'create',
      msg: `Paquete Modulos creados`
    });
  } else {
    console.warn('Advertencia: Socket.io (io) no está definido, no se emitió el evento.');
  }

  return nuevos;
};

const actualizarModulosPaquete = async (codigoModulo, data) => {
  const modulosPaqueteOg = await PTLModulosPaquete.findOne({
    where: { codigoModulo },
  });

  if (!modulosPaqueteOg) {
    throw { statusCode: 404, msg: "No existe un modulo de paquete con ese id" };
  }

  await PTLModulosPaquete.update(data, {
    where: { codigoModulo },
  });

  const modulosPaqueteActualizado = await PTLModulosPaquete.findOne({
    where: { codigoModulo },
  });

  io.emit('modulos-paquete-actualizados', {
    action: 'update',
    msg: `Modulo actualizado: ${modulosPaqueteActualizado.nombreModulo || codigoModulo}`
  });

  return modulosPaqueteActualizado;
};

const eliminarModulosPaquete = async (codigoModuloPQ) => {
  const modulosPaquete = await PTLModulosPaquete.findOne({
    where: { codigoModuloPQ },
  });

  if (!modulosPaquete) {
    throw { statusCode: 404, msg: "No existe un modulo de paquete con ese id" };
  }

  const modulosPaqueteEliminado = await PTLModulosPaquete.destroy({
    where: { codigoModuloPQ },
  });

  io.emit('modulos-paquete-actualizados', {
    action: 'delete',
    msg: `Modulo de paquete eliminado`
  });

  return modulosPaqueteEliminado;
};

module.exports = {
  obtenerModulosPaquete,
  obtenerModulosPaquetePorId,
  obtenerModulosPaquetePorCodigo,
  crearModulosPaquete,
  actualizarModulosPaquete,
  eliminarModulosPaquete,
};