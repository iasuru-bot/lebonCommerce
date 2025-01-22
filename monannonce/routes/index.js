const usersRoutes = require('./utilisateur')
const categsRoutes = require('./categorie')
const annoncesRoutes = require('./annonce')
const signalementsRoutes = require('./signalement')
const adminRoutes = require('./admin')
const authenticateRoutes = require('./authenticate')
const fileRoutes = require('./file')
const { validationAuthentication, authenticate } = require('../middleware/authorization')

function initRoutes(app) {
    app.use('/public', authenticateRoutes)
    app.use(validationAuthentication)
    app.use(authenticate)
    app.use('/utilisateur', usersRoutes)
    app.use('/categorie', categsRoutes)
    app.use('/annonce', annoncesRoutes)
    app.use('/signalement', signalementsRoutes)
    app.use('/admin', adminRoutes)
    app.use('/file', fileRoutes)
}

module.exports = initRoutes; 