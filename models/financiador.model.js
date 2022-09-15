module.exports = (sequelize, type) => {
    var Financiador = sequelize.define(
        "maestro_his_financiador",
        {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                field: "id_financiador",
            },
            descripcion: { type: type.STRING, field: "descripcion_financiador" },
        },
        {
            timestamps: false,
            freezeTableName: true,
        });
    Financiador.associate = function (models) {
        Financiador.hasOne(models.his_atencion, {
            foreignKey: "id_financiador",
        });
    };
    return Financiador;
};
