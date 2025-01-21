const jwt = require ("jsonwebtoken")
const { Utilisateur } = require('../models');

module.exports = {
    validationAuthentication,
    authenticate
}

function validationAuthentication(req,res,next){
    const token = req.headers['authorization'];
    if(!token) return res.status(401).send({message: "no token provided"});
    
    jwt.verify(token, 'secret-key', (err,decoded)=> {
        if (err) return res.status(500).send({message : "failed to authenticate"})
            req.userEmail = decoded.id;
        next();
    })
}

async function authenticate(req, res, next) {
    try {
        const user = await Utilisateur.findOne({ where: { email: req.userEmail } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid token.' });
        }
        next();
    } catch (ex) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};