module.exports = (sequelize, type) => {
  return sequelize.define(
    "his_detalle_diagnostico",
    {
      id_detalle: {
        type: type.INTEGER,
        primaryKey: true,
      },
      id_atencion: type.INTEGER,
      valor_lab: type.STRING,
      diagnostico_tipo: type.STRING,
      id_cie10: type.STRING,
    },
    {
      timestamps: false,
      freezeTableName: true,
      schema: "datahis",
    }
  );
};
