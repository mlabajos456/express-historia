const moment = require("moment");
module.exports = (sequelize, type) => {
  var Paciente = sequelize.define(
    "paciente",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        field: "id_paciente",
      },
      id: {
        type: type.INTEGER,
        primaryKey: true,
        field: "documento",
      },
      f_nacimiento: {
        type: type.DATE,
        get: function () {
          return moment(this.getDataValue("f_nacimiento")).format("DD-MM-YYYY");
        },
      },
      tipodoc: {
        type: type.STRING,
        field: "id_tipo_documento",
      },
      documento: {
        type: type.STRING,
      },
      nombres: {
        type: type.STRING,
      },
      ape_paterno: {
        type: type.STRING,
      },
      ape_materno: {
        type: type.STRING,
      },
      sexo: {
        type: type.STRING,
      },
      ubigeo: {
        type: type.STRING,
        field: "id_ubigeo",
      },
      ubigeo: {
        type: type.STRING,
        field: "id_ubigeo",
      },
      codigo: {
        type: type.STRING,
        field: "cod_paciente",
      },
      telefono: {
        type: type.STRING,
      },
      direccion: {
        type: type.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      /*    defaultScope: {
          attributes: { exclude: ["pass_usuario"] },
        }, */
    }
  );
  Paciente.associate = function (models) {
    /*  Usuario.hasOne(models.his_hoja_atencion, {
        foreignKey: {
          name: "id_responsable",
        },
      }); */
  };
  return Paciente;
};
