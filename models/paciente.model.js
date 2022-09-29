const moment = require("moment");
module.exports = (sequelize, type) => {
    var Paciente = sequelize.define(
        "paciente",
        {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                field: "id_paciente",
            },
            f_nacimiento: {
                type: type.DATE,
                get: function () {
                    return moment(this.getDataValue("f_nacimiento")).format("DD-MM-YYYY");
                },
            },
            tipoDoc: {
                type: type.STRING,
                field: "id_tipo_documento",
            },
            documento: {
                type: type.STRING,
            },
            nombres: {
                type: type.STRING,
            },
            paterno: {
                type: type.STRING,field:"ape_paterno"
            },
            materno: {
                type: type.STRING,field:"ape_materno"
            },
            sexo: {
                type: type.STRING,
            },
            ubigeo: {
                type: type.STRING,
                field: "id_ubigeo",
            },
           
            codigo: {
                type: type.STRING,
                field: "cod_paciente",
            },
            telefono: {
                type: type.STRING,
            },
            direccion: {
                type: type.STRING,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            /*    defaultScope: {
          attributes: { exclude: ["pass_usuario"] },
        }, */
        }
    );
    Paciente.associate = function (models) {
        Paciente.hasOne(models.his_atencion, {
            foreignKey: {
                name: "id_paciente",
            },
        });
     
        Paciente.belongsTo(models.maestro_his_etnia, {
            foreignKey: {
                name: "id_etnia"
            },
            as: "etnia"
        });

        Paciente.belongsTo(models.maestro_his_ubigeo_inei_reniec, {
            foreignKey: "id_ubigeo",
            as: "procedencia"
        });
    };
    return Paciente;
};
