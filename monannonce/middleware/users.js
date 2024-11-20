const {body, validationResult, checkSchema} = require('express-validator')

async function validateUser(req, res, next){
    console.log("user validation...")
    body('nom').notEmpty();
    const [result]   = await checkSchema(
        {
            nom: {notEmpty: true}
        }
    ).run(req);
    if(!result.isEmpty()){
        res.send('Pas de nom trouvé')
    }
    next();
}

module.exports = {
    validateUser
}