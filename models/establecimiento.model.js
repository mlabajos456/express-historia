module.exports = (sequelize, type) => {
    var Establecimiento = sequelize.define(
        "maestro_his_establecimiento",
        {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                field: "codigo_unico",

            },
            establecimiento: { type: type.STRING, field: "nombre_establecimiento" },
            //codigo: { type: type.STRING, field: "codigo_unico" },
            ubigeo: { type: type.STRING, field: "ubigueo_establecimiento" },
            codisa: { type: type.STRING, field: "codigo_disa" },
            departamento: { type: type.STRING, field: "departamento" },
            //------//
            red: { type: type.STRING},
            microred: { type: type.STRING },
            codigo_microred: { type: type.STRING },
            codigo_red: { type: type.STRING },
            nombre_establecimiento: { type: type.STRING },

            codDep: {
                type: type.STRING,
                field: "ubigueo_establecimiento",
                get: function () {
                    return this.ubigeo.substring(0, 2);
                }
            },
            codPro: {
                type: type.STRING,
                field: "ubigueo_establecimiento",
                get: function () {
                    return this.ubigeo.substring(2, 4);
                }
            },
            codDis: {
                type: type.STRING,
                field: "ubigueo_establecimiento",
                get: function () {
                    return this.ubigeo.substring(4, 6);
                }
            }
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
    Establecimiento.associate = function (models) {
        Establecimiento.hasOne(models.his_hoja_atencion, {
            foreignKey: {
                name: "codigo_unico_ipress",
            },
        });

        Establecimiento.hasMany(models.personal, {
            foreignKey: {
                name: "codigo_unico",
            },
            as: "maestro_his_establecimiento"

        });
    };
    return Establecimiento;
};
