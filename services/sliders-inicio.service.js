/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require('../database/connection');
const { SliderInicioModel, SliderInicioDTO } = require('../models/slider');
const { io } = require('../index');

class SliderService {
  constructor() {
    this.model = SliderInicioModel(sequelize);
  }

  async getSliders() {
    return await this.model.findAll();
  }

  async getSliderById(sliderId) {
    const registro = await this.model.findOne({ where: { sliderId } });
    if (!registro) throw { statusCode: 404, msg: "No existe el slider solicitado" };
    return registro;
  }

  async createSlider(rawData) {
    const dataDTO = SliderInicioDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const nuevo = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit('sliders-actualizados', {
          action: 'create',
          msg: `Slider creado: ${nuevo.nombreSlider}`
        });
      }

      return nuevo;
    });
  }

  async updateSlider(sliderId, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = SliderInicioDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { sliderId },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe el slider para actualizar' };

      await this.model.update(dataDTO, {
        where: { sliderId },
        transaction: t
      });

      const actualizado = await this.model.findOne({
        where: { sliderId },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('sliders-actualizados', {
          action: 'update',
          msg: `Slider actualizado: ${actualizado.nombreSlider}`
        });
      }

      return actualizado;
    });
  }

  async deleteSlider(sliderId) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { sliderId },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe el slider con ese ID' };

      const nombreSlider = registroDB.nombreSlider;

      await this.model.destroy({
        where: { sliderId },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('sliders-actualizados', {
          action: 'delete',
          msg: `Slider eliminado: ${nombreSlider}`
        });
      }

      return true;
    });
  }
}

module.exports = SliderService;