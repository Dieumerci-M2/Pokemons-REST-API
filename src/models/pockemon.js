module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('pockemon',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIcremente: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: {msg: `Veillez entre un nom dans la base de données`},
                notNull: {msg: `Les points de vue sont une propiétés réquise`}
                }
        } 
    },
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}