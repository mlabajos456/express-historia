const moment = require("moment");

module.exports = (sequelize, type) => {
  var DetalleUsuario = sequelize.define(
    "his_detalle_usuario",
    {
      id_usuario: {
        type: type.INTEGER,
        primaryKey: true,
      },
      estado: type.BOOLEAN,        
      id_personal: type.INTEGER,
      id_rol: type.INTEGER,
     
    },
    {
      timestamps: false,
      freezeTableName: true,
      schema: "datahis",
    }
  );

  DetalleUsuario.associate = function (models) {

    
   
    

  };

  return DetalleUsuario;
};
