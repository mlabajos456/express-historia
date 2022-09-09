module.exports = (sequelize, type) => {
    var ValorLab = sequelize.define(
        "his_lab",
        {
            id: {
                type: type.STRING,
                primaryKey: true,
                field: "id_lab",
                autoIncrement:true
            },
            id_detalle: { type: type.INTEGER, },
            descripcion: { type: type.STRING, field: "valor_lab" },
        },
        {
            timestamps: false,
            freezeTableName: true,
            schema: "datahis",        }
    );
    ValorLab.associate = function (models) {
        ValorLab.belongsTo(models.his_detalle_diagnostico, {
            foreignKey: "id_detalle",
        });
    };
    return ValorLab;
};
