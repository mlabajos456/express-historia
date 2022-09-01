const moment = require("moment");

module.exports = (sequelize, type) => {
    var Atencion = sequelize.define(
        "his_atencion",
        {
            id_atencion: {
                type: type.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            id_hoja_atencion: type.INTEGER,
            ficha_familiar: type.STRING,
            cef: { type: type.STRING, field: "perimetro_cef" },
            abd: { type: type.STRING, field: "perimetro_abd" },
            observacion: type.STRING,
            ubigeo: type.STRING,
            peso: type.STRING,

            id_financiador: type.STRING /* INNER JOIN */,
            edad_anio: type.STRING,
            edad_mes: type.STRING,
            edad_dias: type.STRING,
            estado_gestante: type.STRING,
            id_centro_poblado: type.STRING,
            condicion_establec: type.STRING,
            condicion_servicio: type.STRING,
            fum: {
                type: type.DATE,
                get: function () {
                    return moment(this.getDataValue("fecha_apertura")).format(
                        "DD-MM-YYYY"
                    );
                },
            },
            fecha_atencion: {
                type: type.DATE,
                get: function () {
                    return moment(this.getDataValue("fecha_cierre")).format("DD-MM-YYYY");
                },
            },
            talla: {
                type: type.STRING,
            },
            id_paciente: type.INTEGER /* inner join */,
            fecha_hb: {
                type: type.DATE,
                get: function () {
                    return moment(this.getDataValue("fecha_cierre")).format("DD-MM-YYYY");
                },
            },
            condicion: {
                type: type.BOOLEAN,
                /*  get() {
          return this.getDataValue("estado") === "1" ? "Activo" : "Inactivo";
        }, */
            },
            num_historia_clinica: type.STRING,
            hemoglobina: { type: type.STRING, field: "val_hemoglobina" },
            estado: { type: type.BOOLEAN },
        },
        {
            timestamps: false,
            freezeTableName: true,
            schema: "datahis",
        }
    );

    Atencion.associate = function (models) {
        Atencion.hasMany(models.his_detalle_diagnostico, {
            foreignKey: "id_atencion",
        });
        /* Atencion.belongsToMany(models.his_detalle_diagnostico, {
      through: "his_detalle_diagnostico",
    }); */
    /*  Atencion.belongsTo(models.his_turno, {
      foreignKey: "id_turno",
    });

    Atencion.belongsTo(models.personal, {
      foreignKey: "id_responsable",
      as: "responsable",
    }); */
    };

    return Atencion;
};
