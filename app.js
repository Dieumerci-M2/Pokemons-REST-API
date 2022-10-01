// Call express since node_module
const express = require('express')
// Call morgan midlleware since his node_module
const morgan = require('morgan')
// Call body-parse middleware sice his module
const bodyParse = require('body-parser') 
// Call serve-favicon since node-module
const favicon = require('serve-favicon')
// destructure message from succsess function
let { message } = require('statuses')
// use express dependancies
const app = express()
// Call sequelize to get Connexion to DB
const sequelize = require('./src/db/sequelize')
// Fixe port for running app content
const port = 5000

//Middlewares

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParse.json())
    .use(express.json())

// Call an instance of Sequelize

sequelize.initDb()

// Fix All Endpoints here
// Endpoint to get all the listPockemon
require('./src/routes/findAllPockemons')(app)
require('./src/routes/findPockemonByPK')(app)
require('./src/routes/createPockemon')(app)
require('./src/routes/updatePockemon')(app)
require('./src/routes/deletePockemon')(app)

// Gestion d'Erreurs
// L'erreur 404
app.use(({res})=>{
    const message = `Imposoble de trouver cette ressource! Veillez chercher un autre URL`
    res.status(404).json({message})
})
// Fix port listerning
app.listen(port, ()=> console.log( `Notre app est lancée sur : http://localhost:${port}`))