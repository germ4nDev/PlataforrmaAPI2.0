/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const ColorSettingService = require("../services/colores-settings.service");
const service = new ColorSettingService();

const getColoresSettings = async (req, res = response) => {
  try {
    const coloresNav = await service.obtenerColoresSettings();
    res.status(200).json({ ok: true, coloresNav });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getColorSettingById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const colorNav = await service.obtenerColorSettingPorId(id);
    res.status(200).json({ ok: true, colorNav });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createColorSetting = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const colorNav = await service.crearColorSetting({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, colorNav });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateColorSetting = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const colorNav = await service.actualizarColorSetting(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, colorNav });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteColorSetting = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.eliminarColorSetting(id);
    res.status(200).json({ ok: true, msg: "Configuración eliminada correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getColoresSettings,
  getColorSettingById,
  createColorSetting,
  updateColorSetting,
  deleteColorSetting
};