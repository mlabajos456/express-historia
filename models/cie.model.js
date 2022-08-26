module.exports = (sequelize, type) => {
  var Cie = sequelize.define(
    "maestro_his_cie_cpms",
    {
      id: {
        type: type.STRING,
        primaryKey: true,
        field: "codigo_item",
      },
      descripcion: { type: type.STRING, field: "descripcion_item" },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  Cie.associate = function (models) {
    Cie.hasOne(models.his_detalle_diagnostico, {
      foreignKey: "id_cie",
    });
  };
  return Cie;
};
