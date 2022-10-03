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
    return sequelize.sync({force: true}).then(()=>{
        listPockemon.map(element =>{
            pockemons.create({
                id: element.id,
                nom : element.nom
            }).then(md => console.log(md.toJSON()))
        })
        console.log(`la base de données à était bien synchroniser`);
    })  
}   

module.exports = {initDb, pockemons};
