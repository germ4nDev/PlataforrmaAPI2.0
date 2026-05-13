const sequelize = require('../database/connection');
const PTLSuitesAP = require('../models/suites-ap')(sequelize);
const { io } = require('../index');

const obtenerSuites = async () => {
  return await PTLSuitesAP.findAll();
};

const obtenerSuitePorId = async (codigoSuite) => {
  const suite = await PTLSuitesAP.findOne({
    where: { codigoSuite },
  });

  if (!suite) {
    throw { statusCode: 404, msg: "No existe una suite por ese id" };
  }

  return suite;
};

const crearSuite = async (data) => {
  // Corregido el typo "nombresuite" a "nombreSuite"
  const existeNombre = await PTLSuitesAP.findOne({
    where: { nombreSuite: data.nombreSuite }
  });

  if (existeNombre) {
    throw { statusCode: 400, msg: 'Ya existe una suite con ese nombre' };
  }

  const suiteDB = await PTLSuitesAP.create(data);

  io.emit('suites-actualizados', {
    action: 'create',
    msg: `Suite creada: ${suiteDB.nombreSuite}`
  });

  return suiteDB;
};

const actualizarSuite = async (codigoSuite, data) => {
  const suiteDB = await PTLSuitesAP.findOne({
    where: { codigoSuite }
  });

  if (!suiteDB) {
    throw { statusCode: 404, msg: 'No existe una suite con ese ID' };
  }

  await PTLSuitesAP.update(data, {
    where: { codigoSuite }
  });

  const suiteActualizada = await PTLSuitesAP.findOne({
    where: { codigoSuite }
  });

  io.emit('suites-actualizados', {
    action: 'update',
    msg: `Suite actualizada: ${suiteActualizada.nombreSuite}`
  });

  return suiteActualizada;
};

const eliminarSuite = async (codigoSuite) => {
  const suiteDB = await PTLSuitesAP.findOne({
    where: { codigoSuite }
  });

  if (!suiteDB) {
    throw { statusCode: 404, msg: 'No existe una suite con ese ID' };
  }

  const nombreSuite = suiteDB.nombreSuite;

  const suiteEliminada = await PTLSuitesAP.destroy({
    where: { codigoSuite }
  });

  io.emit('suites-actualizados', {
    action: 'delete',
    msg: `Suite eliminada: ${nombreSuite}`
  });

  return suiteEliminada;
};

module.exports = {
  obtenerSuites,
  obtenerSuitePorId,
  crearSuite,
  actualizarSuite,
  eliminarSuite,
};