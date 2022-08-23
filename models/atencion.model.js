const moment = require("moment");

module.exports = (sequelize, type) => {
  var Atencion = sequelize.define(
    "his_atencion",
    {
      id_atencion: {
        type: type.INTEGER,
        primaryKey: true,
      },
      id_hoja_atencion: type.INTEGER,
      ficha_familiar: type.STRING,
      cef: { type: type.STRING, field: "perimetro_cef" },
      abd: { type: type.STRING, field: "perimetro_abd" },
      observacion: type.STRING,
      ubigeo: type.STRING,
      peso: type.STRING,
     
      id_financiador: type.INTEGER /* INNER JOIN */,
      edad_año: type.STRING,
      edad_mes: type.STRING,
      edad_dias: type.STRING,
      estado_gestante: type.STRING,
      id_centro_poblado: type.INTEGER,
      condicion_establec: type.STRING,
      condicion_servicio: type.STRING,
      fum: {
        type: type.DATE,
        get: function () {
          return moment(this.getDataValue("fecha_apertura")).format(
            "DD-MM-YYYY"
          );
        },
      },
      fecha_atencion: {
        type: type.DATE,
        get: function () {
          return moment(this.getDataValue("fecha_cierre")).format("DD-MM-YYYY");
        },
      },
      talla: {
        type: type.DATE,
      },
      id_paciente: type.INTEGER /* inner join */,
      fecha_hb: {
        type: type.DATE,
        get: function () {
          return moment(this.getDataValue("fecha_cierre")).format("DD-MM-YYYY");
        },
      },
      condicion: {
        type: type.BOOLEAN,
        /*  get() {
          return this.getDataValue("estado") === "1" ? "Activo" : "Inactivo";
        }, */
      },
      num_historia_clinica: type.STRING,
      hemoglobina: { type: type.STRING, field: "val_hemoglobina" },
      estado_digitador: { type: type.STRING },
      observacion_digitador: { type: type.STRING },
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
      as: "responsable",
    });
  };

  return Atencion;
};
