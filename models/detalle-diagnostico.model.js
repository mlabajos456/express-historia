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
            diagnostico_tipo: type.STRING,
            id_cie: { type: type.STRING, field: "id_cie10",  references: {
                model: "maestro_his_cie_cpms",
                key: "id"
            } },
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
            as: "cie",
        });
        /*  DetalleDiag.belongsToMany(models.his_atencion, {
      through: "his_atencion",
    }); */
        DetalleDiag.belongsTo(models.his_atencion, {
            foreignKey: {
                name: "id_atencion",
            },
        });
        DetalleDiag.hasMany(models.his_detalle_diagnostico, {
            foreignKey: "id_detalle",
        });

        DetalleDiag.hasMany(models.his_lab, {
            foreignKey: "id_detalle",
        });
        /*  DetalleDiag.hasMany(models.maestro_his_cie_cpms, {
            foreignKey: "id_cie",
        }); */
    };
    return DetalleDiag;
};
