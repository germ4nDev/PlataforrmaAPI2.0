const sequelize = require('../database/connection');
const PTLSuscriptores = require('../models/suscriptor')(sequelize);
const { io } = require("../index");

const obtenerSuscriptores = async () => {
  return await PTLSuscriptores.findAll();
};

const obtenerSuscriptorPorId = async (codigoSuscriptor) => {
  const suscriptor = await PTLSuscriptores.findOne({
    where: { codigoSuscriptor },
  });

  if (!suscriptor) {
    throw { statusCode: 404, msg: "ERROREXISTECODE" };
  }

  return suscriptor;
};

const crearSuscriptor = async (data) => {
  const existeIdentificafcion = await PTLSuscriptores.findOne({
    where: { identificacionSuscriptor: data.identificacionSuscriptor },
  });

  if (existeIdentificafcion) {
    throw { statusCode: 400, msg: "ERROREXISTEID" };
  }

  const existeNombre = await PTLSuscriptores.findOne({
    where: { nombreSuscriptor: data.nombreSuscriptor },
  });

  if (existeNombre) {
    throw { statusCode: 400, msg: "ERROREXISTENOMBRE" };
  }

  // Se eliminó el código muerto/comentado que rompía la sintaxis
  const suscriptorDB = await PTLSuscriptores.create(data);

  io.emit("suscriptores-actualizados", {
    action: "create",
    msg: `Suscriptor creado: ${suscriptorDB.nombreSuscriptor}`, // Corregido el género "creada"
  });

  return suscriptorDB;
};

const actualizarSuscriptor = async (codigoSuscriptor, data) => {
  const suscriptorDB = await PTLSuscriptores.findOne({
    where: { codigoSuscriptor }
  });

  if (!suscriptorDB) {
    throw { statusCode: 404, msg: 'ERROREXISTECODE' };
  }

  await PTLSuscriptores.update(data, {
    where: { codigoSuscriptor }
  });

  const suscriptorActualizado = await PTLSuscriptores.findOne({
    where: { codigoSuscriptor }
  });

  io.emit('suscriptores-actualizados', {
    action: 'update',
    msg: `Suscriptor actualizado: ${suscriptorActualizado.nombreSuscriptor}`
  });

  return suscriptorActualizado;
};

const eliminarSuscriptor = async (codigoSuscriptor) => {
  const suscriptorDB = await PTLSuscriptores.findOne({
    where: { codigoSuscriptor }
  });

  if (!suscriptorDB) {
    throw { statusCode: 404, msg: 'ERROREXISTECODE' };
  }

  const nombreSuscriptor = suscriptorDB.nombreSuscriptor;

  const suscriptorEliminado = await PTLSuscriptores.destroy({
    where: { codigoSuscriptor }
  });

  io.emit('suscriptores-actualizados', {
    action: 'delete',
    msg: `ELIMINATEDMSG: ${nombreSuscriptor}`
  });

  return suscriptorEliminado;
};

module.exports = {
  obtenerSuscriptores,
  obtenerSuscriptorPorId,
  crearSuscriptor,
  actualizarSuscriptor,
  eliminarSuscriptor
};