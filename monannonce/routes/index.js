const usersRoutes = require('./user')
const categsRoutes = require('./categorie')
const annoncesRoutes = require('./annonce')
const signalementsRoutes = require('./signalement')
const adminRoutes = require('./admin')

function initRoutes(app){
    app.use('/user', usersRoutes)
    app.use('/categorie',categsRoutes)
    app.use('/annonce',annoncesRoutes)
    app.use('/signalement', signalementsRoutes)
    app.use('/admin', adminRoutes)
}

module.exports = initRoutes; 