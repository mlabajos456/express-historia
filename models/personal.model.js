const moment = require("moment");

module.exports = (sequelize, type) => {
    var Personal = sequelize.define(
        "personal",
        {
            id_personal: {
                type: type.STRING,
                primaryKey: true,
            },
            id_tipo_documento: {
                type: type.STRING,
            },
            numero_documento: type.STRING,
            apellido_paterno: {
                type: type.STRING,
                field: "apellido_paterno_personal",
            },
            apellido_materno: {
                type: type.STRING,
                field: "apellido_materno_personal",
            },
            nombre: {
                type: type.STRING,
                field: "nombres_personal",
            },
            codigo_unico: {
                type: type.STRING
            },
            fecha_nacimiento: {
                type: type.DATE,
                get: function () {
                    return moment(this.getDataValue("fecha_nacimiento")).format(
                        "DD-MM-YYYY"
                    );
                },
            }
        },
        {
            timestamps: false,
            freezeTableName: true,
            schema: "datahis",
        }
    );

    Personal.associate = function (models) {
        Personal.belongsTo(models.his_detalle_usuario, {
            foreignKey: "id_personal",
        });

        Personal.belongsTo(models.maestro_his_establecimiento, {
            foreignKey: {
                name: "codigo_unico",
            },
        });
    };

    return Personal;
};
