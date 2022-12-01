module.exports = (sequelize, type) => {
    var Epidural = sequelize.define(
        "his_epidural",
        {
            id: {
                type: type.INTEGER,
                primaryKey: true,
            },
            descripcion: { type: type.STRING, },
        },
        {
            timestamps: false,
            freezeTableName: true,
            schema: "datahis",
        }
    );
    return Epidural;
};
