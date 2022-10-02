const {pockemons} = require('../db/sequelize')
const {ValidationError, UniqueConstraintError} = require('sequelize')

module.exports = (app)=>{
    app.post('/api/pockemons', (req,res) => {
        pockemons.create(req.body)
        .then(pockemon =>{
            const message = `un pokemon ${req.body.nom} a bien était créer`
            res.status(200).json({message,data: pockemon})
        })
        .catch(err =>{
            if(err instanceof ValidationError){
                res.status(400).json({message: err.message, data: err})
                }
            if(err instanceof UniqueConstraintError){
                res.status(400).json({message: err.message, data: err})
                }
            const message = `Le server ne repond pas veillez ressayez apres quelques instants`     
            res.status(500).json({message})
        })
    })
}