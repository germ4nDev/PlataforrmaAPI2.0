/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require('../database/connection');
const { EmpresaSCModel, EmpresaSCDTO } = require('../models/empresa-sc');
const { io } = require('../index');

class EmpresaSCService {
  constructor() {
    this.model = EmpresaSCModel(sequelize);
  }

  async obtenerEmpresasSC() {
    return await this.model.findAll();
  }

  async obtenerEmpresaSCById(codigoEmpresaSC) {
    const registro = await this.model.findOne({
      where: { codigoEmpresaSC }
    });
    if (!registro) throw { statusCode: 404, msg: "No existe la empresa solicitada" };
    return registro;
  }

  async crearEmpresaSC(rawData) {
    const dataDTO = EmpresaSCDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const nuevaEmpresa = await this.model.create(dataDTO, { transaction: t });

      io.emit('empresas-sc-actualizadas', {
        action: 'create',
        msg: `Empresa creada: ${nuevaEmpresa.nombreEmpresa}`
      });

      return nuevaEmpresa;
    });
  }

  async actualizarEmpresaSC(codigoEmpresaSC, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = EmpresaSCDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoEmpresaSC },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: "No existe la empresa para actualizar" };

      await this.model.update(dataDTO, {
        where: { codigoEmpresaSC },
        transaction: t
      });

      const actualizada = await this.model.findOne({
        where: { codigoEmpresaSC },
        transaction: t
      });

      io.emit('empresas-sc-actualizadas', {
        action: 'update',
        msg: `Empresa actualizada: ${actualizada.nombreEmpresa}`
      });

      return actualizada;
    });
  }

  async eliminarEmpresaSC(codigoEmpresaSC) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoEmpresaSC },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: "No existe la empresa con ese ID" };

      const nombreEmpresa = registroDB.nombreEmpresa;

      await this.model.destroy({
        where: { codigoEmpresaSC },
        transaction: t
      });

      io.emit('empresas-sc-actualizadas', {
        action: 'delete',
        msg: `Empresa eliminada correctamente: ${nombreEmpresa}`
      });

      return true;
    });
  }
}

module.exports = EmpresaSCService;