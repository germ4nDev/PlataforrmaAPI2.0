// /*
//     Author: German Valencia
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLColorSettings = require('../models/color-setting')(sequelize);
// const { io } = require('../index');

// const getColoresSettings = async (req, res) => {
//   try {
//     const coloresNav = await PTLColorSettings.findAll();
//     return res.status(201).json({
//       ok: true,
//       coloresNav: coloresNav,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener la ColoresSettings' });
//   }
// };

// const getColorSettingById = async (req, res) => {
//   try {
//     const colorNavId = req.params.id;
//     const colorNav = await PTLColorSettings.findOne({
//       where: {
//         colorNavId: colorNavId,
//       },
//     });
//     if (!colorNav) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe una colorNav por ese id",
//       });
//     }
//     return res.status(201).json({
//       ok: true,
//       colorNav: colorNav,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener la colorNav" });
//   }
// };

// const createColorSetting = async (req, res = response) => {
//   try {
//     const { ...nuevaColorSetting } = req.body;
//     const colorNavDB = await PTLColorSettings.create(nuevaColorSetting);
//     io.emit('colores-settings-actualizadas', {
//       action: 'create',
//       msg: `Color Settings creado: ${colorNavDB.colorNavId}`
//     });
//     return res.status(201).json({
//       ok: true,
//       colorNav: colorNavDB
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al crear la colorNav'
//     });
//   }
// };

// const updateColorSetting = async (req, res = response) => {
//   try {
//     const { colorNavId, ...data } = req.body;
//     const colorNavDB = await PTLColorSettings.findOne({
//       where: { colorNavId }
//     });
//     if (!colorNavDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe una colorNav con ese ID'
//       });
//     }
//     await PTLColorSettings.update(data, {
//       where: { colorNavId }
//     });
//     const colorNavActualizado = await PTLColorSettings.findOne({ where: { colorNavId } });
//     io.emit('colores-settings-actualizadas', {
//       action: 'update',
//       msg: `Color Settings actualizado: ${colorNavDB.colorNavId}`
//     });
//     return res.status(200).json({
//       ok: true,
//       colorNav: colorNavActualizado
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al actualizar la colorNav'
//     });
//   }
// };

// const deleteColorSetting = async (req, res = response) => {
//   try {
//     const colorNavId = req.params.id;
//     const colorNavDB = await PTLColorSettings.findOne({
//       where: { colorNavId }
//     });
//     if (!colorNavDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un colorNav con ese ID'
//       });
//     }
//     colorNavEliminado = await PTLColorSettings.destroy({
//       where: { colorNavId }
//     });
//     io.emit('colores-settings-actualizadas', {
//       action: 'delete',
//       msg: `Color Settings eliminado correctamente`
//     });
//     return res.status(200).json({
//       ok: true,
//       colorNav: colorNavEliminado,
//       msg: 'la colorNav se elimino correctamente'
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al eliminar la colorNav'
//     });
//   }
// };

// module.exports = {
//   getColoresSettings,
//   getColorSettingById,
//   createColorSetting,
//   updateColorSetting,
//   deleteColorSetting,
// };

/*
    Author: German Valencia
*/
const { response } = require('express');
const colorSettingsService = require('../services/color-settings.service'); // Ajusta la ruta a tu proyecto

const getColoresSettings = async (req, res = response) => {
  try {
    const coloresNav = await colorSettingsService.obtenerColoresSettings();

    return res.status(200).json({
      ok: true,
      coloresNav: coloresNav,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener la ColoresSettings' });
  }
};

const getColorSettingById = async (req, res = response) => {
  try {
    const colorNav = await colorSettingsService.obtenerColorSettingPorId(req.params.id);

    return res.status(200).json({
      ok: true,
      colorNav: colorNav,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: "Error al obtener la colorNav" });
  }
};

const createColorSetting = async (req, res = response) => {
  try {
    const colorNavDB = await colorSettingsService.crearColorSetting(req.body);

    return res.status(201).json({
      ok: true,
      colorNav: colorNavDB
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al crear la colorNav'
    });
  }
};

const updateColorSetting = async (req, res = response) => {
  try {
    const { colorNavId, ...data } = req.body;

    const colorNavActualizado = await colorSettingsService.actualizarColorSetting(colorNavId, data);

    return res.status(200).json({
      ok: true,
      colorNav: colorNavActualizado
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar la colorNav'
    });
  }
};

const deleteColorSetting = async (req, res = response) => {
  try {
    const colorNavEliminado = await colorSettingsService.eliminarColorSetting(req.params.id);

    return res.status(200).json({
      ok: true,
      colorNav: colorNavEliminado,
      msg: 'la colorNav se elimino correctamente'
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar la colorNav'
    });
  }
};

module.exports = {
  getColoresSettings,
  getColorSettingById,
  createColorSetting,
  updateColorSetting,
  deleteColorSetting,
};