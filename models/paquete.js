const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLPaquetes', {
    paquetesId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    codigoPaquete: {
      type: DataTypes.STRING(200),
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
      allowNull: false
    },
    precioPaquete: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false
    },
    precioPromocion: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false
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