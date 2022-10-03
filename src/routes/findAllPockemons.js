const {pockemons} = require('../db/sequelize')
const {Op} = require('sequelize')

module.exports = (app)=>{
    app.get('/api/pockemons', (req, res)=>{ 
        if(req.query.name){
            const name = req.query.name
            return pockemons.findAll({ 
                where : {
                    nom: {
                        [Op.eq]: name
                    }
                }
            })
            .then(pockemon =>{
                const message = `il y'a ${pockemon.length} donnée dont la recherche correspond à ${name}`
                res.json({message, data: pockemon})
            })
        } 
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