module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('pockemon',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIcremente: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        } 
    },
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}