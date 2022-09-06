module.exports = (sequelize, type) => {
    var Ups = sequelize.define(
        "maestro_his_ups",
        {
            id: {
                type: type.STRING,
                primaryKey: true,
                field: "id_ups",
            },
            descripcion: { type: type.STRING, field: "descripcion_ups" },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
    Ups.associate = function (models) {
        Ups.hasOne(models.his_hoja_atencion, {
            foreignKey: {
                name: "id_ups",
            },
        });
    };
    
    return Ups;
};
