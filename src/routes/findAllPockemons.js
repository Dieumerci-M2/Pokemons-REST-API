const {pockemons} = require('../db/sequelize')
const {Op} = require('sequelize')
const { message } = require('statuses')
const auth = require('../authentification/auth')

module.exports = (app)=>{
    app.get('/api/pockemons', auth, (req, res)=>{ 
        if(req.query.name){
            const name = req.query.name
            const limit = parseInt(req.query.limit) || 2

            if(name.length < 2){
                const message = `Le nom de votre pockemon doit contenir au moins 2 caractères`
                res.status(400).json({message})
            }
            return pockemons.findAndCountAll({ 
                where : {
                    nom: {
                        [Op.like]: `%${name}%`
                    }
                },
                order: ['nom'],
                limit: limit 
            })
            .then(({count,rows}) =>{
                const message = `il y'a ${count} donnée dont la recherche correspond à ${name}`
                res.json({message, data: rows})
            })
        } 
        pockemons.findAll({order: ['nom']})
        .then(allpockemons =>{
            const message = `La liste de pockemons a bien était récupérer`
            res.status(200).json({message, data: allpockemons})
        })
        .catch(_ =>{
            res.status(500).json({err: `Le server ne repond pas veillez ressayez après quelques instants`})
        })      
    })
}