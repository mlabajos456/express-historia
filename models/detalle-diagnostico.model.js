module.exports = (sequelize, type) => {
  return sequelize.define(
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
};
