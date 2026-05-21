/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require('../database/connection');
const { EstadoModel, EstadoDTO } = require('../models/estado');
const { io } = require('../index');

class EstadoService {
  constructor() {
    this.model = EstadoModel(sequelize);
  }

  async obtenerEstados() {
    return await this.model.findAll();
  }

  async obtenerEstadoPorId(estadoId) {
    const registro = await this.model.findOne({ where: { estadoId } });
    if (!registro) throw { statusCode: 404, msg: "No existe el estado solicitado" };
    return registro;
  }

  async crearEstado(rawData) {
    const dataDTO = EstadoDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const existeNombre = await this.model.findOne({
        where: { nombreEstado: dataDTO.nombreEstado },
        transaction: t
      });

      if (existeNombre) {
        throw { statusCode: 400, msg: 'Ya existe un estado con ese nombre' };
      }

      const estadoDB = await this.model.create(dataDTO, { transaction: t });

      io.emit('estados-actualizadas', {
        action: 'create',
        msg: `Estado creado: ${estadoDB.nombreEstado}`
      });

      return estadoDB;
    });
  }

  async actualizarEstado(estadoId, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = EstadoDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { estadoId },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe el estado con ese ID' };

      await this.model.update(dataDTO, {
        where: { estadoId },
        transaction: t
      });

      const actualizado = await this.model.findOne({
        where: { estadoId },
        transaction: t
      });

      io.emit('estados-actualizadas', {
        action: 'update',
        msg: `Estado actualizado: ${actualizado.nombreEstado}`
      });

      return actualizado;
    });
  }

  async eliminarEstado(estadoId) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { estadoId },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe el estado con ese ID' };

      const nombreEstado = registroDB.nombreEstado;

      await this.model.destroy({
        where: { estadoId },
        transaction: t
      });

      io.emit('estados-actualizadas', {
        action: 'delete',
        msg: `Estado eliminado: ${nombreEstado}`
      });

      return true;
    });
  }
}

module.exports = EstadoService;