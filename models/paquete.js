/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern, Entity Standardization & SQL Server precision
*/
const { DataTypes } = require('sequelize');

const PaqueteModel = (sequelize) => {
  return sequelize.define('PTLPaquetes', {
    paqueteId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    codigoPaquete: {
      type: DataTypes.STRING(200),
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    nombrePaquete: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcionPaquete: {
      type: DataTypes.STRING(4000),
      allowNull: true
    },
    acuerdoLicencia: {
      type: DataTypes.STRING(4000),
      allowNull: true
    },
    costoPaquete: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    precioPaquete: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    precioPromocion: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    imagenPaquete: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    iconoPaquete: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    colorPaquete: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    promocion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    estadoPaquete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    // AUDITORIA
    codigoUsuarioCreacion: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    fechaCreacion: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    codigoUsuarioModificacion: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    fechaModificacion: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'PTLPaquetes',
    timestamps: false
  });
};

const PaqueteDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoPaquete: data.codigoPaquete,
    nombrePaquete: data.nombrePaquete,
    descripcionPaquete: data.descripcionPaquete || '',
    acuerdoLicencia: data.acuerdoLicencia || '',
    costoPaquete: data.costoPaquete || 0,
    precioPaquete: data.precioPaquete || 0,
    precioPromocion: data.precioPromocion || 0,
    imagenPaquete: data.imagenPaquete || 'no-imagen.png',
    iconoPaquete: data.iconoPaquete || 'default-icon',
    colorPaquete: data.colorPaquete || '#FFFFFF', // Blanco por defecto para no romper estilos
    promocion: data.promocion ?? false,
    estadoPaquete: data.estadoPaquete ?? true,

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  PaqueteModel,
  PaqueteDTO
};