const turnoModel = require("./turno.model");

module.exports = (sequelize, type) => {
  var Atencion = sequelize.define(
    "his_hoja_atencion",
    {
      id_hoja_atencion: {
        type: type.INTEGER,
        primaryKey: true,
      },
      id_turno: type.INTEGER,
    },
    {
      timestamps: false,
      freezeTableName: true,
      schema: "datahis",
    }
  );

  Atencion.associate = function (models) {
    Atencion.belongsTo(models.his_turno, {
      foreignKey: "id_turno",
    });
    Atencion.belongsTo(models.t_usuario, {
      foreignKey: "id_responsable",
    });
  };

  return Atencion;
};
