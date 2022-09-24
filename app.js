const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
let { message } = require('statuses')
const {success} = require('./helper')
const listPockemon = require('./listPockemon')

const app = express()
const port = 5000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
// app.use((req,res,next)=>{
//     console.log(`URL: ${req.url}`);
//     next()
// })

app.get('/',(req,res) => {
    res.send(`<p> je suis là 🤙</p>`)
})
app.get('/api/pokemon/:id', (req,res) => {
    let id = parseInt(req.params.id)
    let pokemon = listPockemon.find(pokemon => pokemon.id === id)
    //res.send(`vous avez choisi le pockemon: ${pokemon.nom}`)
    //res.send(`vous avez choisi le pockemon n° ${id} et son nom est: ${pokemon.nom}`)
    message = `un pokemon a bien était trouvé`
    res.json(success(message,pokemon))
} )

app.get('/api/pokemon', (req,res) =>{

    const numbPockemon = listPockemon.length
    res.send(`nous avons ${numbPockemon} Pockemons pour l'instant`)

})
app.get('/api', (req,res) =>{

    message = `Voici tous les Pockemons`
    res.json(success(message,listPockemon))
})

app.listen(port, ()=> console.log( `Notre app est lancée sur : http://localhost:${port}`))