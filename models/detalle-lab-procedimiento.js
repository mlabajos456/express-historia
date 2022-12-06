module.exports = (sequelize, type) => {
    var LabProcedimiento = sequelize.define(
        "his_lab_procedimiento",
        {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                field: "id_lab_procedimiento",
                autoIncrement: true,
            },
            id_procedimiento: { type: type.INTEGER },
            descripcion: { type: type.STRING, field: "valor_lab_procedimiento" },
        },
        {
            timestamps: false,
            freezeTableName: true,
            schema: "datahis",
        }
    );
    LabProcedimiento.associate = function (models) {
        LabProcedimiento.belongsTo(models.his_procedimiento_diagnostico, {
            foreignKey: "id_procedimiento",
            onDelete: "CASCADE" 
        });
    };
    return LabProcedimiento;
};
