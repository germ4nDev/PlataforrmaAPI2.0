const sequelize = require("../database/connection");
const PTModulosAP = require("../models/modulo-ap")(sequelize);
const { io } = require('../index');

const obtenerModulos = async () => {
  return await PTModulosAP.findAll();
};

const obtenerModuloPorId = async (codigoModulo) => {
  const modulo = await PTModulosAP.findOne({
    where: { codigoModulo },
  });

  if (!modulo) {
    throw { statusCode: 404, msg: "No existe un modulo por ese id" };
  }

  return modulo;
};

const crearModulo = async (data) => {
  const existente = await PTModulosAP.findOne({
    where: { codigoModulo: data.codigoModulo }
  });

  const existeNombre = await PTModulosAP.findOne({
    where: { nombreModulo: data.nombreModulo }
  });

  if (existente) {
    throw { statusCode: 400, msg: 'Ya existe un módulo con ese código' };
  }

  if (existeNombre) {
    throw { statusCode: 400, msg: 'Ya existe un módulo con ese nombre' };
  }

  const nuevo = await PTModulosAP.create(data);

  io.emit('modulos-actualizados', {
    action: 'create',
    msg: `Modulo creado: ${nuevo.nombreModulo}`
  });

  return nuevo;
};

const actualizarModulo = async (codigoModulo, data) => {
  const moduloOg = await PTModulosAP.findOne({
    where: { codigoModulo },
  });

  if (!moduloOg) {
    throw { statusCode: 404, msg: "No existe un modulo por ese id" };
  }

  await PTModulosAP.update(data, {
    where: { codigoModulo },
  });

  const moduloActualizado = await PTModulosAP.findOne({
    where: { codigoModulo },
  });

  io.emit('modulos-actualizados', {
    action: 'update',
    msg: `Modulo actualizado: ${moduloActualizado.nombreModulo}` // Corregido el typo "actualozado"
  });

  return moduloActualizado;
};

const eliminarModulo = async (codigoModulo) => {
  const modulo = await PTModulosAP.findOne({
    where: { codigoModulo },
  });

  if (!modulo) {
    throw { statusCode: 404, msg: "No existe un modulo por ese id" };
  }

  const moduloEliminado = await PTModulosAP.destroy({
    where: { codigoModulo },
  });

  io.emit('modulos-actualizados', {
    action: 'delete',
    msg: `Modulo eliminado: ${modulo.nombreModulo}`
  });

  return moduloEliminado;
};

module.exports = {
  obtenerModulos,
  obtenerModuloPorId,
  crearModulo,
  actualizarModulo,
  eliminarModulo,
};