
module.exports = (sequelize, type) => {
    var PrenatalHoja = sequelize.define(
        "his_atencion_prenatal_hoja",
        {
            id_atencion: {
                type: type.INTEGER,
                references: {
                    model: "his_atencion",
                    key: "id_atencion"
                }
            },
            id_gestante: {type:type.INTEGER, 
                references: {
                    model: "gestante",
                    key: "id_gestante"
                }
            },
            id_num : {type: type.INTEGER,primaryKey: true},
        },
        {
            timestamps: false,
            freezeTableName: true,
            schema: "datahis",
        }
    );

    PrenatalHoja.associate = function (models) {
        PrenatalHoja.belongsTo(models.his_atencion, {
            foreignKey: "id_atencion",            
        });        
       
    };

    return PrenatalHoja;
};
