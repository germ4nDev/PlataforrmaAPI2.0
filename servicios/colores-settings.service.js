const sequelize = require('../database/connection');
const PTLColorSettings = require('../models/color-setting')(sequelize);
const { io } = require('../index');

const obtenerColoresSettings = async () => {
  return await PTLColorSettings.findAll();
};

const obtenerColorSettingPorId = async (colorNavId) => {
  const colorNav = await PTLColorSettings.findOne({
    where: { colorNavId },
  });

  if (!colorNav) {
    throw { statusCode: 404, msg: "No existe un colorNav por ese id" };
  }

  return colorNav;
};

const crearColorSetting = async (data) => {
  const colorNavDB = await PTLColorSettings.create(data);

  io.emit('colores-settings-actualizadas', {
    action: 'create',
    msg: `Color Settings creado: ${colorNavDB.colorNavId}`
  });

  return colorNavDB;
};

const actualizarColorSetting = async (colorNavId, data) => {
  const colorNavDB = await PTLColorSettings.findOne({
    where: { colorNavId }
  });

  if (!colorNavDB) {
    throw { statusCode: 404, msg: 'No existe un colorNav con ese ID' };
  }

  await PTLColorSettings.update(data, {
    where: { colorNavId }
  });

  const colorNavActualizado = await PTLColorSettings.findOne({
    where: { colorNavId }
  });

  io.emit('colores-settings-actualizadas', {
    action: 'update',
    msg: `Color Settings actualizado: ${colorNavActualizado.colorNavId}`
  });

  return colorNavActualizado;
};

const eliminarColorSetting = async (colorNavId) => {
  const colorNavDB = await PTLColorSettings.findOne({
    where: { colorNavId }
  });

  if (!colorNavDB) {
    throw { statusCode: 404, msg: 'No existe un colorNav con ese ID' };
  }

  const colorNavEliminado = await PTLColorSettings.destroy({
    where: { colorNavId }
  });

  io.emit('colores-settings-actualizadas', {
    action: 'delete',
    msg: `Color Settings eliminado correctamente`
  });

  return colorNavEliminado;
};

module.exports = {
  obtenerColoresSettings,
  obtenerColorSettingPorId,
  crearColorSetting,
  actualizarColorSetting,
  eliminarColorSetting,
};