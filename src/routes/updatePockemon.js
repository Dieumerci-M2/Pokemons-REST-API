const {pockemons} = require('../db/sequelize')
const {ValidationError, UniqueConstraintError} = require('sequelize')

module.exports = (app)=>{
    app.put('/api/pockemon/:id', (req,res) => {
        const id = req.params.id
        pockemons.update(req.body, {
            where: {id : id}
        })
        .then(()=>{
            return pockemons.findByPk(id)
            .then(pockemon =>{
                if(pockemon === null){
                    const message= `le Pockemon que nous chercher n'existe pas! veillez enter un bon Identifiant`
                    res.status(404).json({message})
                }
                const message = `le pokemon a bien modifier`
                res.status(200).json({message,data: pockemon})
            })
        })
        .catch(err =>{
            if(err instanceof ValidationError){
                res.status(400).json({message: err.message, data: err})
                }
            if(err instanceof UniqueConstraintError){
                res.status(400).json({message: err.message, data: err})
                }
            res.status(500).json({err: `Le server ne repond pas veillez ressayez apres quelques instants`})
        })  
    })
}