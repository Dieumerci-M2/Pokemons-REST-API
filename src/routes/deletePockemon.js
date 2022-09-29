const {pockemons} = require('../db/sequelize')

module.exports = (app)=>{
    app.delete('/api/pokemon/:id', (req,res) => {
        pockemons.findByPk(req.params.id)
        .then(pockemon =>{
            const message = `le pokemon ${pockemon.name} a bien était supprimer`
            res.json(success({message,data: pockemon}))
        })
    } )
}