/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const EmpresaSCModel = (sequelize) => {
  return sequelize.define('PTLEmpresasSC', {
    empresaId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoEmpresaSC: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    codigoSuscriptor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombreEmpresa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionEmpresa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoEmpresa: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Estandarizado a true por defecto para nuevas entidades
    },
    logoEmpresa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // AUDITORIA ------------
    codigoUsuarioCreacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaCreacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoUsuarioModificacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaModificacion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'PTLEmpresasSC',
    timestamps: false
  });
};

const EmpresaSCDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoEmpresaSC: data.codigoEmpresaSC,
    codigoSuscriptor: data.codigoSuscriptor,
    nombreEmpresa: data.nombreEmpresa,
    descripcionEmpresa: data.descripcionEmpresa || '',
    estadoEmpresa: data.estadoEmpresa ?? true,
    logoEmpresa: data.logoEmpresa || 'no-imagen.png',

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  EmpresaSCModel,
  EmpresaSCDTO
};