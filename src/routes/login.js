const {user} = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../authentification/private_key')

module.exports = (app)=>{
    app.post('/api/login', (req, res)=>{

        user.findOne({where: {userName : req.body.userName}}).then(user =>{

            if(!user){
                const message = `L'utiliser demander n'existe pas!`
                res.status(404).json({message})
            }else{
                bcrypt.compare(req.body.password, user.password).then(isPasswordValid =>{
                    if(!isPasswordValid){
                        const message = `Le mot de passe est incorrect`
                        res.status(401).json({message})
                    }else{
                        // JWT
                        const token = jwt.sign(
                            {userId: user.id},
                            privateKey,
                            {expiresIn : '24h'}
                        )
                        const message = `La connexion a été bien établie`
                        res.json({message, data: user, token})
                    }
                    
                })
            }
        })
        .catch(err =>{
            const message = `La connexion n'a pas été bien établie veillez réesayer après quelques instant`
            res.status(500).json({message}) 
        })
    })
}