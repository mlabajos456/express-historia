const moment = require("moment");

module.exports = (sequelize, type) => {
  var Atencion = sequelize.define(
    "his_hoja_atencion",
    {
      id_hoja_atencion: {
        type: type.INTEGER,
        primaryKey: true,
      },
      id_turno: type.INTEGER,
      /*  id_digitador: type.INTEGER,
      id_responsable: type.INTEGER, */
      fecha_apertura: type.DATE,
      fechaCierre: { type: type.DATE, field: "fecha_cierre" },
      fecha: {
        type: type.DATE,
        get: function () {
          return moment(this.getDataValue("fecha")).format("DD-MM-YYYY");
        },
      },
      ipress: {
        type: type.STRING,
        field: "codigo_unico_ipress",
      },
      estado: {
        type: type.STRING,
        get() {
          return this.getDataValue("estado") === "1" ? "Activo" : "Inactivo";
        },
      },
      nomObservacion: {
        type: type.VIRTUAL,
        get() {
          return `${this.getDataValue("fecha")} ${this.getDataValue(
            "fechaCierre"
          )}`;
        },
      },
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
