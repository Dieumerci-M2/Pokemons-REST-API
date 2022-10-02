const {pockemons} = require('../db/sequelize')

module.exports = (app)=>{
    app.put('/api/pokemon/:id', (req,res) => {
        const id  = req.params.id
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
            res.status(500).json({err: `Le server ne repond pas veillez ressayez apres quelques instants`})
        })  
    })
}