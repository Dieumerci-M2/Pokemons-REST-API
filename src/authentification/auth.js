const jwt = require('jsonwebtoken')
const privateKey = require('../authentification/private_key')

module.exports = (req, res, next) =>{

    const authorisationHeader  = req.headers.authorization;

    if(!authorisationHeader){
        const message = `vous n'avez pas fournie de jeton d'authentification, veillez en ajouter dans l'entête de la requête`
        res.status(401).json({message})
    }

    const token = authorisationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken)=>{

        if(error){ 
            const message = `L'utilisateur n'est pas authorisez à acceder à cette ressource`
            res.status(401).json({message, data: error})
        }

        const userId = decodedToken.userId
        if(req.body.userId && req.body.userId !== userId){
            const message = `L'identifiant de l'utilisateur est invalid`
            res.status(401).json({message})
        }else{
            next();
        }
    })
}