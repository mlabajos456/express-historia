module.exports = (sequelize, type) => {
  return sequelize.define(
    "t_usuario",
    {
      id_usuario: {
        type: type.INTEGER,
        primaryKey: true
      },
      pass_usuario: type.STRING,
      nom_usuario: type.STRING,
      estado_usuario: type.ENUM("A", "I")
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
   
  );
};
