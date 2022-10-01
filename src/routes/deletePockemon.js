const {pockemons} = require('../db/sequelize')

module.exports = (app)=>{
    app.delete('/api/pockemons/:id', (req,res) => {
        pockemons.findByPk(req.params.id)
        .then(() =>{
            const pockemonDeleted = pockemons;
        pockemons.destroy({
            where: {id: pockemons.id}
        })
            .then(()=>{
            const message = `le pokemon ${pockemonDeleted} a bien était supprimer`
            res.status(200).json({message,data: pockemonDeleted})
             })
        })
    } )
}