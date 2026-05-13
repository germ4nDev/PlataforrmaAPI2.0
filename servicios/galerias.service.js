const sequelize = require("../database/connection");
const PTLGaleria = require("../models/galeria")(sequelize);
const { io } = require("../index");

const obtenerGalerias = async () => {
  return await PTLGaleria.findAll();
};

const obtenerGaleriaPorId = async (codigoGaleria) => {
  const galeria = await PTLGaleria.findOne({
    where: { codigoGaleria },
  });

  if (!galeria) {
    throw { statusCode: 404, msg: "No existe una galería con ese id" };
  }

  return galeria;
};

const crearGaleria = async (data) => {
  // Si la base de datos rechaza la creación por validaciones, 
  // Sequelize lanzará automáticamente el error y el controlador lo atrapará
  const nuevo = await PTLGaleria.create(data);

  if (typeof io !== 'undefined') {
    io.emit('galerias-actualizadas', { // Corregido: 'actualizadas' con 'a'
      action: 'create',
      msg: `Galería creada: ${nuevo.nombreGaleria || 'Sin nombre'}` // Corregido: antes decía nombreIdioma
    });
  } else {
    console.warn('Advertencia: Socket.io (io) no está definido, no se emitió el evento.');
  }

  return nuevo;
};

const actualizarGaleria = async (codigoGaleria, data) => {
  const galeriaDB = await PTLGaleria.findOne({
    where: { codigoGaleria },
  });

  if (!galeriaDB) {
    throw { statusCode: 404, msg: "No existe una galería con ese ID" };
  }

  await PTLGaleria.update(data, {
    where: { codigoGaleria },
  });

  const galeriaActualizada = await PTLGaleria.findOne({
    where: { codigoGaleria },
  });

  io.emit("galerias-actualizadas", {
    action: "update",
    msg: `Galería actualizada: ${galeriaActualizada.nombreGaleria}`,
  });

  return galeriaActualizada;
};

const eliminarGaleria = async (codigoGaleria) => {
  const galeriaDB = await PTLGaleria.findOne({
    where: { codigoGaleria },
  });

  if (!galeriaDB) {
    throw { statusCode: 404, msg: "No existe una galería con ese ID" };
  }

  const galeriaEliminada = await PTLGaleria.destroy({
    where: { codigoGaleria },
  });

  io.emit("galerias-actualizadas", {
    action: "delete",
    msg: `Galería eliminada correctamente`,
  });

  return galeriaEliminada;
};

module.exports = {
  obtenerGalerias,
  obtenerGaleriaPorId,
  crearGaleria,
  actualizarGaleria,
  eliminarGaleria,
};