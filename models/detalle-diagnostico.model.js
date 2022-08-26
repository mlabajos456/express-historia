module.exports = (sequelize, type) => {
  var DetalleDiag = sequelize.define(
    "his_detalle_diagnostico",
    {
      id_detalle: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_atencion: type.INTEGER,
      valor_lab: type.STRING,
      diagnostico_tipo: type.STRING,
      id_cie: { type: type.STRING, field: "id_cie10" },
    },
    {
      timestamps: false,
      freezeTableName: true,
      schema: "datahis",
    }
  );
  DetalleDiag.associate = function (models) {
    DetalleDiag.belongsTo(models.maestro_his_cie_cpms, {
      foreignKey: "id_cie",
      as: "cie",
    });
    /*  DetalleDiag.belongsToMany(models.his_atencion, {
      through: "his_atencion",
    }); */
    DetalleDiag.belongsTo(models.his_atencion, {
      foreignKey: {
        name: "id_atencion",
      },
    });
  };
  return DetalleDiag;
};
