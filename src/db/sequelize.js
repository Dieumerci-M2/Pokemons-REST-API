const {Sequelize, DataTypes} = require('sequelize')
const PockemonModel = require('../models/pockemon')
let listPockemon = require('./listPockemon')

// Configure Sequelize ORM

const sequelize = new Sequelize(
    'pockedex',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOption: {
            timezone: 'Etc/GMT+2'
        },
        logging: false
    }
)

let pockemons = PockemonModel(sequelize, DataTypes)
const initDb = ()=>{
    return sequelize.sync()
    .then(()=>console.log(`la base de données a bien été synchroniser`))
    listPockemon.map(element =>{
        pockemons.create({
            id : 1,
            nom : element.nom
        }).then(md => console.log(md.toJSON()))
    }) 
}

module.exports = {initDb, pockemons};
