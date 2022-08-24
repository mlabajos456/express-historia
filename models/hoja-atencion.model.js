const moment = require("moment");

module.exports = (sequelize, type) => {
  var HojaAtencion = sequelize.define(
    "his_hoja_atencion",
    {
      id_hoja_atencion: {
        type: type.INTEGER,
        primaryKey: true,
      },
      id_turno: type.INTEGER,
      id_responsable: type.STRING,
      id_digitador: type.STRING,
      fecha_apertura: {
        type: type.DATE,
        get: function () {
          return moment(this.getDataValue("fecha_apertura")).format(
            "DD-MM-YYYY"
          );
        },
      },
      fecha_cierre: {
        type: type.DATE,
        get: function () {
          return moment(this.getDataValue("fecha_cierre")).format("DD-MM-YYYY");
        },
      },
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
      nombre_digitador: type.STRING,
      observacion_digitador: type.STRING,
      nomObservacion: {
        type: type.VIRTUAL,
        get() {
          return `${this.getDataValue(
            "nombre_digitador"
          )} - ${this.getDataValue("observacion_digitador")}`;
        },
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      schema: "datahis",
    }
  );

  HojaAtencion.associate = function (models) {
    HojaAtencion.belongsTo(models.his_turno, {
      foreignKey: "id_turno",
    });

    HojaAtencion.belongsTo(models.t_usuario, {
      foreignKey: "id_responsable",
      as: "responsable",
    });
  };

  return HojaAtencion;
};