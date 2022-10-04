const {Sequelize, DataTypes} = require('sequelize')
const PockemonModel = require('../models/pockemon')
let listPockemon = require('./listPockemon')
const userModel = require('../models/user')
const bcrypt = require('bcrypt')

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
let user = userModel(sequelize, DataTypes)

const initDb = ()=>{
    return sequelize.sync({force: true}).then(()=>{
        listPockemon.map(element =>{
            pockemons.create({
                id: element.id,
                nom : element.nom
            }).then(md => console.log(md.toJSON()))
        })
        bcrypt.hash('mdcongopress', 10)
        .then(hash =>{
            user.create({
                id: 1,
                userName : 'md',
                password: hash
            })
        })
        console.log(`la base de données à était bien synchroniser`);
    })  
}   

module.exports = {initDb, pockemons, user};
