module.exports = (sequelize, type) => {
    return sequelize.define(
      "his_detalle_diagnostico",
      {
        id_detalle: {
          type: type.INTEGER,
          primaryKey: true
        },
        diagnostico_tipo: type.STRING,
      },
      {
        timestamps: false,
        freezeTableName: true,
        schema:'datahis'
      },
     
    );
  };
  