module.exports = (sequelize, type) => {
  return sequelize.define(
    "paciente",
    {
      id_atencion: {
        type: type.INTEGER,
        primaryKey: true,
      },
      observacion: type.STRING,
    },
    {
      timestamps: false,
      freezeTableName: true,
      schema: 'datahis'
    }
  );
};
