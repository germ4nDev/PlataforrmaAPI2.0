/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern, Transactions & Class-Based Service
*/
const fs = require("fs");
const path = require("path");
const sequelize = require("../database/connection");
const { BibliotecaModel, BibliotecaDTO } = require("../models/biblioteca");
const { io } = require("../index");

class BibliotecasService {
  constructor() {
    this.model = BibliotecaModel(sequelize);
  }

  async getBibliotecas() {
    return await this.model.findAll();
  }

  async getBibliotecaByCode(codigoBiblioteca) {
    const registro = await this.model.findOne({ where: { codigoBiblioteca } });
    if (!registro) throw { statusCode: 404, msg: "No existe la biblioteca solicitada" };
    return registro;
  }

  async createBiblioteca(rawData) {
    const dataDTO = BibliotecaDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const nuevaBiblioteca = await this.model.create(dataDTO, { transaction: t });

      io.emit("biblioteca-actualizadas", {
        action: "create",
        msg: `Biblioteca creada: ${nuevaBiblioteca.nombreBiblioteca}`,
      });

      return nuevaBiblioteca;
    });
  }

  async updateBiblioteca(codigoBiblioteca, rawData, usuarioId) {
    rawData.codigoUsuario = usuarioId || rawData.codigoUsuario || "SISTEMA";
    const dataDTO = BibliotecaDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const bibliotecaDB = await this.model.findOne({
        where: { codigoBiblioteca },
        transaction: t
      });

      if (!bibliotecaDB) throw { statusCode: 404, msg: "No existe la biblioteca con ese ID" };

      const imagenAnterior = bibliotecaDB.imagenBiblioteca;

      await this.model.update(dataDTO, {
        where: { codigoBiblioteca },
        transaction: t
      });

      // if (dataDTO.imagenBiblioteca && imagenAnterior !== dataDTO.imagenBiblioteca) {
      //   this.#deleteArchivoFisico(imagenAnterior);
      // }

      const actualizada = await this.model.findOne({
        where: { codigoBiblioteca },
        transaction: t
      });

      io.emit("biblioteca-actualizadas", {
        action: "update",
        msg: `Biblioteca actualizada: ${actualizada.nombreBiblioteca}`,
      });

      return actualizada;
    });
  }

  async deleteBiblioteca(codigoBiblioteca) {
    return await sequelize.transaction(async (t) => {
      const bibliotecaDB = await this.model.findOne({
        where: { codigoBiblioteca },
        transaction: t
      });

      if (!bibliotecaDB) throw { statusCode: 404, msg: "No existe la biblioteca con ese ID" };

      const imagenABorrar = bibliotecaDB.imagenBiblioteca;

      await this.model.destroy({
        where: { codigoBiblioteca },
        transaction: t
      });

      // this.#deleteArchivoFisico(imagenABorrar);

      io.emit("biblioteca-actualizadas", {
        action: "delete",
        msg: `Biblioteca eliminada correctamente`,
      });

      return true;
    });
  }
}

module.exports = BibliotecasService;