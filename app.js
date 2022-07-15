const express = require('express')
const {success} = require('./helper')
let listPockemon = require('./listPockemon')

const app = express()
const port = 5000

app.get('/',(req,res) => {
    res.send(`<p> je sui là </p>`)
})
app.get('/api/pokemon/:id' , (req,res) => {
    const id = parseInt(req.params.id)
    res.send(`<h1> Voici ${listPockemon[id]} ton Pokemon</h1>`)
} )

app.get('/api/pokemon', (req,res) =>{

    const numbPockemon = listPockemon.length
    res.send(`nous avons ${numbPockemon} Pockemons pour l'instant`)

})
// app.get('/api/pockemon/:id' , (req , res) =>{
//     const id = parseInt(req.params.id)
//     //const message  = `Voici la list de tous les pockemons`
//     res.json(listPockemon[id])
// })
app.listen(port, ()=> console.log( `Notre app est lancée sur : http://localhost:${port}`))