/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLPaquetes', {
    paquetesId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoPaquete: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    nombrePaquete: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionPaquete: {
      type: DataTypes.STRING,
      allowNull: false
    },
    acuerdoLicencia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    costoPquete: {
      type: DataTypes.INTEGER,
      default: 0,
      allowNull: false
    },
    precioPaquete: {
      type: DataTypes.INTEGER,
      default: 0,
      allowNull: false
    },
    precioPromocion: {
      type: DataTypes.INTEGER,
      default: 0,
      allowNull: false
    },
    imagenPaquete: {
      type: DataTypes.STRING,
      allowNull: false
    },
    iconoPaquete: {
      type: DataTypes.STRING,
      allowNull: false
    },
    colorPaquete: {
      type: DataTypes.STRING,
      allowNull: false
    },
    promocion: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    estadoPaquete: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'PTLPaquetes',
    timestamps: false
  });
};