/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLUsuariosEmpresasSC', {
    usuarioEmpresaSCId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoUsuarioEmpresaSC: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    codigoEmpresaSC: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoUsuairoSC: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoUsuairoEmpresaSC: {
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
    tableName: 'PTLUsuariosEmpresasSC',
    timestamps: false
  });
};