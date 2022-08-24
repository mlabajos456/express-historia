module.exports = (sequelize, type) => {
  var Perfil = sequelize.define(
    "perfil",
    {
      id_perfil: {
        type: type.INTEGER,
        primaryKey: true,
      },
      nombre: type.STRING,
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  /*  Perfil.associate = function (models) {
     Usuario.hasOne(models.his_detalle_usuario, {
       foreignKey: {
         name: "id_rol",
       },
     });
   }; */
  return Perfil;
};
