const userRoutes = require('./users')

function initRoutes(app){
    app.use('/users', userRoutes)
}

module.exports = initRoutes; 