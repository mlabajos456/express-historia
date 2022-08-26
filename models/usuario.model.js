module.exports = (sequelize, type) => {
  var Usuario = sequelize.define(
    "t_usuario",
    {
      id_usuario: {
        type: type.INTEGER,
        primaryKey: true,
      },
      pass_usuario: type.STRING,
      nom_usuario: type.STRING,
      dni: type.STRING,
      estado_usuario: {
        type: type.STRING,
        get() {
          const estado = this.getDataValue("estado_usuario");
          return estado === "1" ? "Activo" : "Inactivo";
        },
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      /*    defaultScope: {
        attributes: { exclude: ["pass_usuario"] },
      }, */
    }
  );
  Usuario.associate = function (models) {
    Usuario.hasMany(models.his_detalle_usuario, {
      foreignKey: {
        name: "id_usuario",
      },
    });
  };
  return Usuario;
};
