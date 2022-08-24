module.exports = (sequelize, type) => {
    var Ups = sequelize.define(
      "maestro_his_ups",
      {
        id_ups: {
          type: type.STRING,
          primaryKey: true,
        },
        descripcion_ups: type.STRING,
      },
      {
        timestamps: false,
        freezeTableName: true,
        /*    defaultScope: {
          attributes: { exclude: ["pass_usuario"] },
        }, */
      }
    );
    Ups.associate = function (models) {
      Ups.hasOne(models.his_hoja_atencion, {
        foreignKey: {
          name: "id_ups",
        },
      });
    };
    return Ups;
  };
  