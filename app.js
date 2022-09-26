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
// Call success function to get message and data
const {success,unicId} = require('./helper')
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
    .use(bodyParse.json())
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
// use Post method to get a new Pockemon in listPockemon
app.post('/api',(req,res)=>{
    const id = unicId(listPockemon)
    const pockemonCreated = {...req.body, ...{id: id, created: new Date()}}
    listPockemon.push(pockemonCreated)
    const message = `le Pockemon ${pockemonCreated.name} a bien été créer`
    res.json(success(message,pockemonCreated))
})
// use Put method to update a listPochemon
app.put('api/pockemon/:id',(req,res)=>{
    let id = parseInt(req.params.id)
    let pockemonUpdate = { ...req.body, id: id}
    listPockemon = listPockemon.map(pockemon=>{
        return pockemon.id === id ? pockemonUpdate : pockemon
    })
    let message = `le pockemon ${pockemonUpdate.name} a bien été mofidier`
    res.json(success(message,pockemonUpdate))
})
// use DELETE method to delete one pockemon on the listPockemon
app.delete('api/pockemon/:id' ,(req,res)=>{
    const id = parseInt(req.params.id)
    const deletePockemon = listPockemon.find(pockemon=> pockemon.id === id)
    listPockemon.filter(pockemon.id !== id)
    let message = `le Pockemon ${deletePockemon} a bien été suprimer`
    res.json(success(message,deletePockemon))
})
app.listen(port, ()=> console.log( `Notre app est lancée sur : http://localhost:${port}`))