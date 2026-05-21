/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require('../database/connection');
const { TicketAPModel, TicketAPDTO } = require('../models/ticket-ap');
const { io } = require('../index');

class TicketAPService {
  constructor() {
    this.model = TicketAPModel(sequelize);
  }

  async getTickets() {
    return await this.model.findAll();
  }

  async getTicketById(codigoTicket) {
    const registro = await this.model.findOne({ where: { codigoTicket } });
    if (!registro) throw { statusCode: 404, msg: "No existe el ticket solicitado" };
    return registro;
  }

  async createTicket(rawData) {
    const dataDTO = TicketAPDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const nuevo = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit('tickets-ap-actualizados', {
          action: 'create',
          msg: `Ticket creado: ${nuevo.nombreTicket}`
        });
      }

      return nuevo;
    });
  }

  async updateTicket(codigoTicket, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = TicketAPDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoTicket },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe el ticket para actualizar' };

      await this.model.update(dataDTO, {
        where: { codigoTicket },
        transaction: t
      });

      const actualizado = await this.model.findOne({
        where: { codigoTicket },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('tickets-ap-actualizados', {
          action: 'update',
          msg: `Ticket actualizado: ${actualizado.nombreTicket}`
        });
      }

      return actualizado;
    });
  }

  async deleteTicket(codigoTicket) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoTicket },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe el ticket con ese ID' };

      const nombreTicket = registroDB.nombreTicket;

      await this.model.destroy({
        where: { codigoTicket },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('tickets-ap-actualizados', {
          action: 'delete',
          msg: `Ticket eliminado: ${nombreTicket}`
        });
      }

      return true;
    });
  }
}

module.exports = TicketAPService;