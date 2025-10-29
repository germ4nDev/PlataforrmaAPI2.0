/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLUsuariosSC', {
    usuarioSTId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoUsuarioSC: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    codigoUsuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoEmpresaSC: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoUsuarioSC: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    // AUDITORIA ------------
    codigoUsuarioCreacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    codigoUsuarioModificacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaModificacion: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'PTLUsuariosSC',
    timestamps: false
  });
};