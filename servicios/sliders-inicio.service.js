const sequelize = require('../database/connection');
const PTLSliderInicio = require('../models/slider')(sequelize);
const { io } = require('../index');

const obtenerSlidersInicio = async () => {
  return await PTLSliderInicio.findAll();
};

const obtenerSliderInicioPorId = async (sliderId) => {
  const sliderInicio = await PTLSliderInicio.findOne({
    where: { sliderId },
  });

  if (!sliderInicio) {
    throw { statusCode: 404, msg: "No existe un sliderInicio por ese id" };
  }

  return sliderInicio;
};

const crearSliderInicio = async (data) => {
  const sliderInicioDB = await PTLSliderInicio.create(data);

  io.emit('sliders-actualizados', {
    action: 'create',
    msg: `Slider creado: ${sliderInicioDB.nombreSlider}` // Corregido typo Sllider
  });

  return sliderInicioDB;
};

const actualizarSliderInicio = async (sliderId, data) => {
  const sliderInicioDB = await PTLSliderInicio.findOne({
    where: { sliderId }
  });

  if (!sliderInicioDB) {
    throw { statusCode: 404, msg: 'No existe un sliderInicio con ese ID' };
  }

  await PTLSliderInicio.update(data, {
    where: { sliderId }
  });

  const sliderInicioActualizado = await PTLSliderInicio.findOne({
    where: { sliderId }
  });

  io.emit('sliders-actualizados', {
    action: 'update',
    msg: `Slider actualizado: ${sliderInicioActualizado.nombreSlider}` // Corregido typo
  });

  return sliderInicioActualizado;
};

const eliminarSliderInicio = async (sliderId) => {
  const sliderInicioDB = await PTLSliderInicio.findOne({
    where: { sliderId }
  });

  if (!sliderInicioDB) {
    throw { statusCode: 404, msg: 'No existe un sliderInicio con ese ID' };
  }

  // Guardamos el nombre antes de destruirlo para poder enviarlo en el socket
  const nombreSlider = sliderInicioDB.nombreSlider;

  const sliderInicioEliminado = await PTLSliderInicio.destroy({
    where: { sliderId }
  });

  io.emit('sliders-actualizados', {
    action: 'delete',
    msg: `Slider eliminado: ${nombreSlider}` // Corregido bug de return de sequelize
  });

  return sliderInicioEliminado;
};

module.exports = {
  obtenerSlidersInicio,
  obtenerSliderInicioPorId,
  crearSliderInicio,
  actualizarSliderInicio,
  eliminarSliderInicio,
};