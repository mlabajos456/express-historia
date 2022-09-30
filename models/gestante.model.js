module.exports = (sequelize, type) => {
    var Gestante = sequelize.define(
        "gestante_doc",
        {
            id_gestante: {
                type: type.INTEGER,
                
                
            },
           
            documento: {
                type: type.STRING,
                references :{
                    model: "paciente",
                    key: "documento"

                },
                primaryKey: true
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: "gestante",
        }
    );
    Gestante.associate = function (models) {
        Gestante.hasOne(models.paciente, {
            foreignKey: "documento",            
        }); 
        /*  Gestante.belongsTo(models.paciente, {
            foreignKey: "documento",            
        });  */
        /* Paciente.hasOne(models.his_atencion, {
            foreignKey: {
                name: "id_paciente",
            },
        }); */
        /*  Paciente.belongsTo(models.maestro_his_etnia, {
            foreignKey: {
                name: "id_etnia"
            },
            as: "etnia"
        });   */    
    };
    return Gestante;
};