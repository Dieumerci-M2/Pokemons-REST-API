
const express = require('express')
let listPockemon = require('./listPockemon')

const app = express()
const port = 5000

app.get('/',(req,res) => {
    res.send(`<p> je sui là </p>`)
})
// app.get('/api/pokemon/:id' , (req,res) => {
//     const recupererid = parseInt(req.params.id)
//     const pokemon = list_pockemon.find( (pokemon) => list_pockemon.id === recupererid)
//     res.send(`<h1> Voici ${list_pockemon.nom} ton Pokemon</h1>`)
// } )

// app.get('/api/pokemon', (req,res) =>{

//     const numbPockemon = listPockemon.length
//     res.send(`nous avons ${numbPockemon} Pockemons pour l'instant`)

// })
app.listen(port, ()=> console.log( `Notre app est lancée sur : http://localhost:${port}`))