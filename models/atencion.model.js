module.exports = (sequelize, type) => {
    return sequelize.define(
        "paciente",
        {
            id_paciente: {
                type: type.INTEGER,
                primaryKey: true
            },
            documento: type.STRING,
            nombres: type.STRING,
            f_nacimiento: type.DATEONLY
        },
        {
            timestamps: false,
            freezeTableName: true
        },
    );
};
