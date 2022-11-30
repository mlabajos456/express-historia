module.exports = (sequelize, type) => {
    var TratamientoDiagnostico = sequelize.define(
        "his_tratamiento_diagnostico",
        {
            id_tratamiento: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            observacion: { type: type.STRING },
            via_administracion: { type: type.INTEGER },
            cod_sismed: { type: type.STRING },
            id_detalle: { type: type.INTEGER, field: "id_detalle_diagnostico" },
        },
        {
            timestamps: false,
            freezeTableName: true,
            schema: "datahis",
        }
    );
    TratamientoDiagnostico.associate = function (models) {
        TratamientoDiagnostico.belongsTo(models.his_detalle_diagnostico, {
            foreignKey: "id_detalle",
            onDelete: "CASCADE"
        });
    };
    return TratamientoDiagnostico;
};
