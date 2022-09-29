const {pockemons} = require('../db/sequelize')

module.exports = (app)=>{
    app.post('/api/pockemons', (req,res) => {
        pockemons.create(req.body)
        .then(pockemon =>{
            const message = `un pokemon ${pockemon.nom} a bien était trouvé`
            res.json(success({message,data: pockemon}))
        })
    } )
}