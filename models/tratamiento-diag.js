module.exports = (sequelize, type) => {
    var TratamientoDiagnostico = sequelize.define(
        "his_tratamiento_diagnostico",
        {
            id_tratamiento: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_detalle: { type: type.INTEGER },
            indicaciones: { type: type.STRING, field: "observacion" },
            //via_administracion: { type: type.INTEGER },
            via_administracion: {
                type: type.INTEGER, references: {
                    model: "his_epidural",
                    key: "id"
                }
            },
            cod_sismed: { type: type.STRING },
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
        TratamientoDiagnostico.belongsTo(models.his_epidural, {
            foreignKey: "via_administracion",
            as: "epidural"
        });
    };
    return TratamientoDiagnostico;
};
