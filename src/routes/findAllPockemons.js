const {pockemons} = require('../db/sequelize')

module.exports = (app)=>{
    app.get('/api/pockemons', (req, res)=>{
        pockemons.findAll()
        .then(allpockemons =>{
            const message = `La liste de pockemons a bien était récupérer`
            res.status(200).json({message, data: allpockemons})
        })
        .catch(_ =>{
            res.status(500).json({err: `Le server ne repond pas veillez ressayez après quelques instants`})
        })    
    })
}