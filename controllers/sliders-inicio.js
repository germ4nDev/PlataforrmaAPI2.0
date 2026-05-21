/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const SliderService = require("../services/sliders-inicio.service");
const service = new SliderService();

const getSliders = async (req, res = response) => {
  try {
    const slidersInicio = await service.getSliders();
    res.status(200).json({ ok: true, slidersInicio });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getSliderById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const sliderInicio = await service.getSliderById(id);
    res.status(200).json({ ok: true, sliderInicio });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createSlider = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const sliderInicio = await service.createSlider({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, sliderInicio });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateSlider = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const sliderInicio = await service.updateSlider(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, sliderInicio });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteSlider = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteSlider(id);
    res.status(200).json({ ok: true, msg: "Slider eliminado correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getSliders,
  getSliderById,
  createSlider,
  updateSlider,
  deleteSlider
};