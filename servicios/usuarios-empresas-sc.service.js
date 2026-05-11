const sequelize = require("../database/connection");
const PTLUsuariosEmpresasSC = require("../models/usuario-empresa-sc")(sequelize);
const { io } = require("../index");

const obtenerUsuariosEmpresas = async () => {
  return await PTLUsuariosEmpresasSC.findAll();
};

const obtenerUsuarioEmpresaPorId = async (codigoUsuarioEmpresaSC) => {
  const usuarioEmpresa = await PTLUsuariosEmpresasSC.findOne({
    where: { codigoUsuarioEmpresaSC },
  });

  if (!usuarioEmpresa) {
    throw { statusCode: 404, msg: "No existe un usuarioEmpresa por ese id" };
  }

  return usuarioEmpresa;
};

const crearUsuarioEmpresa = async (data) => {
  const nuevo = await PTLUsuariosEmpresasSC.create(data);

  io.emit('usuarios-empresas-actualizados', {
    action: 'create',
    msg: `Usuario Empresa creado`
  });

  return nuevo;
};

const actualizarUsuarioEmpresa = async (codigoUsuarioEmpresaSC, data) => {
  const usuarioEmpresaDB = await PTLUsuariosEmpresasSC.findOne({
    where: { codigoUsuarioEmpresaSC },
  });

  if (!usuarioEmpresaDB) {
    throw { statusCode: 404, msg: "No existe un usuarioEmpresa con ese ID" };
  }

  await PTLUsuariosEmpresasSC.update(data, {
    where: { codigoUsuarioEmpresaSC },
  });

  const usuarioEmpresaActualizado = await PTLUsuariosEmpresasSC.findOne({
    where: { codigoUsuarioEmpresaSC },
  });

  io.emit('usuarios-empresas-actualizados', {
    action: 'update',
    msg: `Usuario Empresa actualizado`
  });

  return usuarioEmpresaActualizado;
};

const eliminarUsuarioEmpresa = async (codigoUsuarioEmpresaSC) => {
  const usuarioEmpresaDB = await PTLUsuariosEmpresasSC.findOne({
    where: { codigoUsuarioEmpresaSC },
  });

  if (!usuarioEmpresaDB) {
    throw { statusCode: 404, msg: "No existe un usuarioEmpresa con ese ID" };
  }

  const usuarioEmpresaEliminado = await PTLUsuariosEmpresasSC.destroy({
    where: { codigoUsuarioEmpresaSC },
  });

  io.emit('usuarios-empresas-actualizados', {
    action: 'delete',
    msg: `Usuario Empresa eliminado`
  });

  return usuarioEmpresaEliminado; // Retorna cantidad de filas eliminadas
};

module.exports = {
  obtenerUsuariosEmpresas,
  obtenerUsuarioEmpresaPorId,
  crearUsuarioEmpresa,
  actualizarUsuarioEmpresa,
  eliminarUsuarioEmpresa,
};