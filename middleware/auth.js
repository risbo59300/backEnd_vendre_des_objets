const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try {
        // Extraction du token du header de la requête entrante
        const token = req.headers.authorization.split(' ')[1];
        // Décodage du token avec la fonction verify()
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // Extraction de l'ID utilisateur du token
        const userId = decodedToken.userId;
        req.auth = {userId};

        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';        
        } else {
            next();
        }

    } catch  {
        res.status(401).json({error: new Error('Requête invalide !')}); 
    }
}