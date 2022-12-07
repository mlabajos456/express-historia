module.exports = (sequelize, type) => {
    var ProcedimientoDiagnostico = sequelize.define(
        "his_procedimiento_diagnostico",
        {
            id_procedimiento: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_detalle: { type: type.INTEGER },
            id_cie: {
                type: type.STRING, field: "id_cie10", references: {
                    model: "maestro_his_cie_cpms",
                    key: "id"
                }
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            schema: "datahis",
        }
    );
    ProcedimientoDiagnostico.associate = function (models) {
        ProcedimientoDiagnostico.belongsTo(models.his_detalle_diagnostico, {
            foreignKey: "id_detalle",
            onDelete: "CASCADE"
        });
        ProcedimientoDiagnostico.belongsTo(models.maestro_his_cie_cpms, {
            foreignKey: "id_cie",
            as: "cie"
        });
        ProcedimientoDiagnostico.hasMany(models.his_lab_procedimiento, {
            foreignKey: {
                name: "idProc"
            },
            as:"labProc",
            onDelete: "CASCADE",
        });
    };
    return ProcedimientoDiagnostico;
};
