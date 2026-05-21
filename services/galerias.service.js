/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require("../database/connection");
const { GaleriaModel, GaleriaDTO } = require("../models/galeria");
const { io } = require("../index");

class GaleriasService {
  constructor() {
    this.model = GaleriaModel(sequelize);
  }

  async obtenerGalerias() {
    return await this.model.findAll();
  }

  async obtenerGaleriaPorId(codigoGaleria) {
    const registro = await this.model.findOne({ where: { codigoGaleria } });
    if (!registro) throw { statusCode: 404, msg: "No existe la galería solicitada" };
    return registro;
  }

  async crearGaleria(rawData) {
    const dataDTO = GaleriaDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const galeriaDB = await this.model.create(dataDTO, { transaction: t });

      io.emit("galerias-actualizadas", {
        action: "create",
        msg: `Galería creada: ${galeriaDB.nombreGaleria}`,
      });

      return galeriaDB;
    });
  }

  async actualizarGaleria(codigoGaleria, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = GaleriaDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoGaleria },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: "No existe la galería con ese ID" };

      await this.model.update(dataDTO, {
        where: { codigoGaleria },
        transaction: t
      });

      const actualizado = await this.model.findOne({
        where: { codigoGaleria },
        transaction: t
      });

      io.emit("galerias-actualizadas", {
        action: "update",
        msg: `Galería actualizada: ${actualizado.nombreGaleria}`,
      });

      return actualizado;
    });
  }

  async eliminarGaleria(codigoGaleria) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoGaleria },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: "No existe la galería con ese ID" };

      const nombreGaleria = registroDB.nombreGaleria; // Guardamos el nombre antes de borrar

      await this.model.destroy({
        where: { codigoGaleria },
        transaction: t
      });

      io.emit("galerias-actualizadas", {
        action: "delete",
        msg: `Galería "${nombreGaleria}" eliminada correctamente`,
      });

      return true;
    });
  }
}

module.exports = GaleriasService;