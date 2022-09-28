// Call express since node_module
const express = require('express')
// Call Sequilize ORM to communucate with SQL dataBase
const {Sequelize, DataTypes} = require('sequelize')
// Call morgan midlleware since his node_module
const morgan = require('morgan')
// Call body-parse middleware sice his module
const bodyParse = require('body-parser') 
// Call serve-favicon since node-module
const favicon = require('serve-favicon')
// destructure message from succsess function
let { message } = require('statuses')
// Call success function to get message and data
const {success,unicId} = require('./helper')
// Call listPockemon Object to manipulate data
let listPockemon = require('./listPockemon')
const PockemonModel = require('./src/models/pockemon')

// use express dependancies
const app = express()
// Fixe port for running app content
const port = 5000
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
// Verify if I'm allready connect to the DB
sequelize.authenticate()
    .then(()=> console.log(`la connexion à la DB a était bien reçus`))
    .catch(err => console.log(`la connexion à la DB n'as pas été recus ${err}`))

let pockemons = PockemonModel(sequelize, DataTypes)
sequelize.sync()
.then(()=>console.log(`la base de données a bien été synchroniser`))
listPockemon.map(element =>{
    pockemons.create({
        id : element.id,
        nom : element.nom
    }).then(md => console.log(md.toJSON()))
})

//Middlewares
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParse.json())
    .use(express.json())
// Fix port listerning
app.listen(port, ()=> console.log( `Notre app est lancée sur : http://localhost:${port}`))
// use Get method to configure racine road
app.get('/',(req,res) => {
    res.send(`<p> je suis là 🤙</p>`)
})
// Other get methods and other road 
app.get('/api/pokemon/:id', (req,res) => {
    let id = parseInt(req.params.id)
    let pokemon = listPockemon.find(pokemon => pokemon.id === id)
    //res.send(`vous avez choisi le pockemon: ${pokemon.nom}`)
    //res.send(`vous avez choisi le pockemon n° ${id} et son nom est: ${pokemon.nom}`)
    message = `un pokemon a bien était trouvé`
    res.json(success(message,pokemon))
} )
// road to show the number of all pockemons
app.get('/api/pokemon', (req,res) =>{

    const numbPockemon = listPockemon.length
    res.send(`nous avons ${numbPockemon} Pockemons pour l'instant`)

})
//road to show all the list of pockemon's reccord
app.get('/api', (req,res) =>{

    message = `Voici tous les Pockemons`
    res.json(success(message,listPockemon))
})
// use Post method to get a new Pockemon in listPockemon
app.post('/api',(req,res)=>{
    const id = unicId(listPockemon)
    const pockemonCreated = {...req.body, ...{id: id, created: new Date()}}
    listPockemon.push(pockemonCreated)
    const message = `le Pockemon ${pockemonCreated.name} a bien été créer`
    res.json(success(message,pockemonCreated))
})
// use Put method to update a listPochemon
app.put('/api/pockemon/:id', (req,res)=>{
    const id = parseInt(req.params.id)
    const index = listPockemon.findIndex(pockemon => pockemon.id === id)
    if(index === -1){
        return res.send(`le Pockemon n'est pas trouver`)
    }
    const pockemonUpdate = { ...req.body, id: listPockemon[index].id

    } 
    console.log(pockemonUpdate);
    let message = `le pockemon ${pockemonUpdate.nom} a bien été mofidier`
    res.json(success(message,pockemonUpdate))    
    })

// use DELETE method to delete one pockemon on the listPockemon
app.delete('/api/pockemon/:id' ,(req,res)=>{
    const id = parseInt(req.params.id)
    const deletePockemon = listPockemon.find(pockemon=> pockemon.id === id)
    listPockemon = listPockemon.filter(pockemon => pockemon.id !== id)
    let message = `le Pockemon ${deletePockemon.nom} a bien été suprimer`
    res.json(success(message,deletePockemon))
})
