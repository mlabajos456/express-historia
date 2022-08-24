const moment = require("moment");

module.exports = (sequelize, type) => {
  var Personal = sequelize.define(
    "personal",
    {
      id_personal: {
        type: type.STRING,
        primaryKey: true,
      },
      id_tipo_documento: {
        type: type.STRING,
      },
      numero_documento: type.STRING,
      apellido_paterno: {
        type: type.STRING,
        field: "apellido_paterno_personal",
      },
      apellido_materno: {
        type: type.STRING,
        field: "apellido_materno_personal",
      },
      nombre: {
        type: type.STRING,
        field: "nombres_personal",
      },
      fecha_nacimiento: {
        type: type.DATE,
        get: function () {
          return moment(this.getDataValue("fecha_nacimiento")).format(
            "DD-MM-YYYY"
          );
        },
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      schema: "datahis",
    }
  );

  Personal.associate = function (models) {
   /*  Atencion.belongsTo(models.his_turno, {
      foreignKey: "id_turno",
    });

    Atencion.belongsTo(models.t_usuario, {
      foreignKey: "id_responsable",
      as: "responsable",
    }); */
  };

  return Personal;
};
