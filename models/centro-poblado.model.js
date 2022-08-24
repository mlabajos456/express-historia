module.exports = (sequelize, type) => {
  var CentroPoblado = sequelize.define(
    "maestro_his_centro_poblado",
    {
      id: {
        type: type.STRING,
        primaryKey: true,
        field: "id_centro_poblado",
      },
      descripcion: { type: type.STRING, field: "descripcion_centro_poblado" },
      codigo: { type: type.STRING, field: "id_codigo_centro_poblado" },
      ubigeo: { type: type.STRING, field: "id_ubigeo_centro_poblado" },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  CentroPoblado.associate = function (models) {
    CentroPoblado.hasOne(models.his_atencion, {
      foreignKey: {
        name: "id_centro_poblado",
      },
    });
  };
  return CentroPoblado;
};
