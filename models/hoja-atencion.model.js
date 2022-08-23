module.exports = (sequelize, type) => {
  var Atencion = sequelize.define(
    "his_hoja_atencion",
    {
      id_hoja_atencion: {
        type: type.INTEGER,
        primaryKey: true,
      },
      id_turno: type.INTEGER,
      /*  id_digitador: type.INTEGER,
      id_responsable: type.INTEGER, */
      fecha_apertura: type.DATE,
      fecha_cierre: type.DATE,
      fecha: {
        type: type.DATE,
       /*  get: function () {
          // or use get(){ }
          return this.getDataValue("fecha").toLocaleString("en-GB", {
            timeZone: "UTC",
          });
        }, */
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      schema: "datahis",
    }
  );

  Atencion.associate = function (models) {
    Atencion.belongsTo(models.his_turno, {
      foreignKey: "id_turno",
    });
    Atencion.belongsTo(models.t_usuario, {
      foreignKey: "id_responsable",
    });
  };

  return Atencion;
};
