/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require("../database/connection");
const { FormatoGaleriaModel, FormatoGaleriaDTO } = require("../models/formato-galeria");
const { io } = require("../index");

class FormatoGaleriaService {
  constructor() {
    this.model = FormatoGaleriaModel(sequelize);
  }

  async obtenerFormatosGaleria() {
    return await this.model.findAll();
  }

  async obtenerFormatoGaleriaPorId(codigoFormato) {
    const registro = await this.model.findOne({ where: { codigoFormato } });
    if (!registro) throw { statusCode: 404, msg: "No existe el formato de galería solicitado" };
    return registro;
  }

  async crearFormatoGaleria(rawData) {
    const dataDTO = FormatoGaleriaDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const existeNombre = await this.model.findOne({
        where: { nombreFormato: dataDTO.nombreFormato },
        transaction: t
      });

      if (existeNombre) {
        throw { statusCode: 400, msg: 'Ya existe un formato con ese nombre' };
      }

      const formatoDB = await this.model.create(dataDTO, { transaction: t });

      io.emit("formatos-galeria-actualizadas", {
        action: "create",
        msg: `Formato de Galería creado: ${formatoDB.nombreFormato}`,
      });

      return formatoDB;
    });
  }

  async actualizarFormatoGaleria(codigoFormato, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = FormatoGaleriaDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoFormato },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: "No existe el formato de galería con ese ID" };

      await this.model.update(dataDTO, {
        where: { codigoFormato },
        transaction: t
      });

      const actualizado = await this.model.findOne({
        where: { codigoFormato },
        transaction: t
      });

      io.emit("formatos-galeria-actualizadas", {
        action: "update",
        msg: `Formato de Galería actualizado: ${actualizado.nombreFormato}`,
      });

      return actualizado;
    });
  }

  async eliminarFormatoGaleria(codigoFormato) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoFormato },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: "No existe el formato de galería con ese ID" };

      const nombreFormato = registroDB.nombreFormato;

      await this.model.destroy({
        where: { codigoFormato },
        transaction: t
      });

      io.emit("formatos-galeria-actualizadas", {
        action: "delete",
        msg: `Formato de Galería eliminado: ${nombreFormato}`,
      });

      return true;
    });
  }
}

module.exports = FormatoGaleriaService;