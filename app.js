// Call express since node_module
const express = require('express')
// Call morgan midlleware since his node_module
const morgan = require('morgan')
// Call serve-favicon since node-module
const favicon = require('serve-favicon')
// destructure message from succsess function
let { message } = require('statuses')
// Call success function to get message and data
const {success} = require('./helper')
// Call listPockemon Object to manipulate data
const listPockemon = require('./listPockemon')

// use express dependancies
const app = express()
// Fixe port for running app content
const port = 5000
// Middlewares
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
// app.use((req,res,next)=>{
//     console.log(`URL: ${req.url}`);
//     next()
// })
// use get method to define racine road showing 
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



app.listen(port, ()=> console.log( `Notre app est lancée sur : http://localhost:${port}`))