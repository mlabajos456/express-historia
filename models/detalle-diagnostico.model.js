module.exports = (sequelize, type) => {
    var DetalleDiag = sequelize.define(
        "his_detalle_diagnostico",
        {
            id_detalle: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_atencion: type.INTEGER,
            tipo_cie: type.STRING,
            diagnostico_tipo: type.STRING,
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
    DetalleDiag.associate = function (models) {
        DetalleDiag.belongsTo(models.maestro_his_cie_cpms, {
            foreignKey: "id_cie",
            as: "cie"
        });
        DetalleDiag.belongsTo(models.his_atencion, {
            foreignKey: {
                name: "id_atencion",
            },
            onDelete: "CASCADE",
        });
        DetalleDiag.hasMany(models.his_lab, {
            foreignKey: {
                name: "id_detalle"
            },
            onDelete: "CASCADE",
        });
        DetalleDiag.hasMany(models.his_tratamiento_diagnostico, {
            foreignKey: {
                name: "id_detalle"
            },
            onDelete: "CASCADE",
            as: "tratamientos",
        });
    };
    return DetalleDiag;
};
