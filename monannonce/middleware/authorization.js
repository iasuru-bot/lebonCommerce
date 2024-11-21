const jwt = require ("jsonwebtoken")

module.exports = {
    validationAuthentication
}

function validationAuthentication(req,res,next){
    const token = req.headers['authorization'];
    if(!token) return res.status(401).send({message: "no token provided"});

    jwt.verify(token, 'secret-key', (err,decoded)=> {
        if (err) return res.status(500).send({message : "failed to authenticate"})
            req.userId = decoded.id;
        next();
    })
}