const {pockemons} = require('../db/sequelize')

module.exports = (app)=>{
    app.put('/api/pokemon/:id', (req,res) => {
        const id  = req.params.id
        pockemons.update(req.body, {
            where: {id : id}
        })
        .then(()=>{
            pockemons.findByPk(id)
            .then(pockemon =>{
                const message = `le pokemon a bien modifier`
                res.status(200).json({message,data: pockemon})
            })
        })  
    })
}