const usersRoutes = require('./users')
const categsRoutes = require('./categories')
const annoncesRoutes = require('./annonces')
const signalementsRoutes = require('./signalement')

function initRoutes(app){
    app.use('/users', usersRoutes)
    app.use('/categories',categsRoutes)
    app.use('/annonces',annoncesRoutes)
    app.use('/signalements', signalementsRoutes)
}

module.exports = initRoutes; 