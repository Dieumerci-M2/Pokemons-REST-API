const {pockemons} = require('../db/sequelize')

module.exports = (app)=>{
    app.delete('/api/pockemons/:id', (req,res) => {
        pockemons.findByPk(req.params.id)
        .then((pockemon) =>{
            if(pockemon === null){
                const message= `le Pockemon que nous chercher n'existe pas! veillez enter un bon Identifiant`
                res.status(404).json({message})
            }
            const pockemonDeleted = pockemons;
            return pockemons.destroy({
            where: {id: pockemons.id}
        })
            .then(()=>{
            const message = `le pokemon ${pockemonDeleted} a bien était supprimer`
            res.status(200).json({message,data: pockemonDeleted})
             })
             .catch(err =>{
                res.status(501).json({err: `La suppression a échouée, problème du serveur, veillez ressayez de nouveau`})
            })
        })
        .catch(err =>{
            res.status(500).json({err: `Le server ne repond pas veilez ressayez apres quelques instants`})
        })
    })
}