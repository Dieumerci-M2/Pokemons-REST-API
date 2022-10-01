const {pockemons} = require('../db/sequelize')

module.exports = (app)=>{
    app.post('/api/pockemons', (req,res) => {
        pockemons.create(req.body)
        .then(pockemon =>{
            const message = `un pokemon ${req.body.nom} a bien était créer`
            res.status(200).json({message,data: pockemon})
        })
        .catch(err =>{
            res.status(500).json({err: `Le server ne repond pas veilez ressayez apres quelques instants`})
        })
    })
}