const sequelize = require('../database/connection');
const PTLEmpresasSC = require('../models/empresa-sc')(sequelize);
const { io } = require('../index');

const obtenerEmpresasSC = async () => {
  return await PTLEmpresasSC.findAll();
};

const obtenerEmpresaSCById = async (codigoEmpresaSC) => {
  const empresaSC = await PTLEmpresasSC.findOne({
    where: { codigoEmpresaSC }
  });

  if (!empresaSC) {
    throw { statusCode: 404, msg: "No existe una empresaSC por el id" };
  }

  return empresaSC;
};

const crearEmpresaSC = async (data) => {
  const nuevo = await PTLEmpresasSC.create(data);

  io.emit('empresas-sc-actualizadas', {
    action: 'create',
    msg: `Empresa creada: ${nuevo.nombreEmpresa}`
  });

  return nuevo;
};

const actualizarEmpresaSC = async (codigoEmpresaSC, data) => {
  const empresaSCDB = await PTLEmpresasSC.findOne({
    where: { codigoEmpresaSC }
  });

  if (!empresaSCDB) {
    throw { statusCode: 404, msg: "No existe una empresaSC por ese id" };
  }

  await PTLEmpresasSC.update(data, {
    where: { codigoEmpresaSC }
  });

  // Obtenemos el registro recién actualizado para emitirlo por el socket
  const empresaSCActualizada = await PTLEmpresasSC.findOne({
    where: { codigoEmpresaSC }
  });

  io.emit('empresas-sc-actualizadas', {
    action: 'update',
    msg: `Empresa actualizada: ${empresaSCActualizada.nombreEmpresa}`
  });

  return empresaSCActualizada;
};

const eliminarEmpresaSC = async (codigoEmpresaSC) => {
  const empresaDB = await PTLEmpresasSC.findOne({
    where: { codigoEmpresaSC } // Corregido: antes decía codigoEmpresa
  });

  if (!empresaDB) {
    // Corregido: antes decía 'aplicación'
    throw { statusCode: 404, msg: 'No existe una empresaSC con ese ID' };
  }

  const nombreEmpresa = empresaDB.nombreEmpresa;

  const empresaEliminada = await PTLEmpresasSC.destroy({
    where: { codigoEmpresaSC }
  });

  // Corregidos los mensajes y el nombre del evento que eran de 'aplicaciones'
  io.emit('empresas-sc-actualizadas', {
    action: 'delete',
    msg: `Empresa eliminada correctamente: ${nombreEmpresa}`
  });

  return empresaEliminada;
};

module.exports = {
  obtenerEmpresasSC,
  obtenerEmpresaSCById,
  crearEmpresaSC,
  actualizarEmpresaSC,
  eliminarEmpresaSC,
};