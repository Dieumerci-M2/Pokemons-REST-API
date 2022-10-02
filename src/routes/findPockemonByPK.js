const {pockemons} = require('../db/sequelize')

module.exports = (app)=>{
    app.get('/api/pockemons/:id', (req,res) => {
        pockemons.findByPk(req.params.id)
        .then(pockemon =>{
            if(pockemon === null){
                const message= `le Pockemon que nous chercher n'existe pas! veillez enter un bon Identifiant`
                res.status(404).json({message})
            }
            const message = `un pokemon a bien était trouvé`
            res.status(200).json({message,data: pockemon})
        })
        .catch(err =>{
            res.status(500).json({err: `Le server ne repond pas veillez ressayez apres quelques instants`})
        })
    } )
}
