const {pockemons} = require('../db/sequelize')

module.exports = (app)=>{
    app.get('/api/pokemon/:id', (req,res) => {
        pockemons.findByPk(req.params.id)
        .then(pockemon =>{
            const message = `un pokemon a bien était trouvé`
            res.json(success({message,data: pockemon}))
        })
    } )
}