module.exports = (sequelize, type) => {
  var Ubigeo = sequelize.define(
    "maestro_his_ubigeo_inei_reniec",
    {
      id: {
        type: type.STRING,
        primaryKey: true,
        field: "id_ubigueo_inei",
      },
      departamento: type.STRING,
      provincia: type.STRING,
      distrito: type.STRING,
      codDep: { type: type.STRING, field: "codigo_departamento_inei" },
      codProv: { type: type.STRING, field: "codigo_provincia_inei" },
      codDist: { type: type.STRING, field: "codigo_distrito_inei" },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  Ubigeo.associate = function (models) {
    Ubigeo.hasOne(models.his_atencion, {
      foreignKey: {
        name: "ubigeo",
      },
    });
    Ubigeo.hasOne(models.paciente, {
      foreignKey: {
        name: "id_ubigeo",
      },
    });
  };
  return Ubigeo;
};
