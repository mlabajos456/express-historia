module.exports = (sequelize, type) => {
  var Establecimiento = sequelize.define(
    "maestro_his_establecimiento",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        field: "id_establecimiento",
      },
      establecimiento: { type: type.STRING, field: "nombre_establecimiento" },
      codigo: { type: type.STRING, field: "codigo_unico" },
      ubigeo: { type: type.STRING, field: "ubigueo_establecimiento" },
    /*   codigoRed: { type: type.STRING, field: "codigo_red" },
      codMicroRed: { type: type.STRING, field: "codigo_microred" },
      codisa: { type: type.STRING, field: "codigo_disa" },
      departamento: { type: type.STRING, field: "departamento" },
      red: { type: type.STRING, field: "provincia" },
      microRed: { type: type.STRING, field: "distrito" }, */
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  Establecimiento.associate = function (models) {
    Establecimiento.hasOne(models.his_hoja_atencion, {
      foreignKey: {
        name: "codigo_unico_ipress",
      },
    });
    Establecimiento.hasOne(models.personal, {
      foreignKey: {
        name: "codigo_unico",
      },
    });
  };
  return Establecimiento;
};
