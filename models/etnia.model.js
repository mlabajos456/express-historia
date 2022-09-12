module.exports = (sequelize, type) => {
    var Etnia = sequelize.define(
        "maestro_his_etnia",
        {
            id: {
                type: type.STRING,
                primaryKey: true,
                field: "id_etnia",
            },
            descripcion: { type: type.STRING, field: "descripcion_etnia" },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
    return Etnia;
};
