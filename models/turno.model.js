const atencionModel = require("./atencion.model");

module.exports = (sequelize, type) => {
  var Turno = sequelize.define(
    "his_turno",
    {
      id_turno: {
        type: type.INTEGER,
        primaryKey: true,
      },
      nombre_turno: type.STRING,
    },
    {
      timestamps: false,
      freezeTableName: true,
      schema: "datahis",
    }
  );

  Turno.associate = function (models) {
    Turno.hasOne(models.his_hoja_atencion, {
      foreignKey: "id_turno",
    });
  };

  return Turno;
};
