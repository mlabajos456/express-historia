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
      estado_usuario: type.ENUM("A", "I"),
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  Usuario.associate = function (models) {
    Usuario.hasOne(models.his_hoja_atencion, {
      foreignKey: "id_responsable",
    });
  };
  return Usuario;
};
