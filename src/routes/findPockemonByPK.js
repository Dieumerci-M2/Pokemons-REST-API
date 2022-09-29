const {pockemons} = require('../db/sequelize')

const findPockemonByPK = (app)=>{
    app.findByPK('/api/pokemon/:id', (req,res) => {
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
}
