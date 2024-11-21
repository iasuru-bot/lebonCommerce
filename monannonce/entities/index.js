const {Sequelize} = require ('sequelize')
const Utilisateur = require('./utilisateur')
const Categorie = require('./categorie')
const Signalement = require('./signalement')
const Annonce = require('./annonce')

//DB 
async function initModels() {
    const sequelize = new Sequelize(`mariadb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@db:${process.env.DB_HOST}/`)

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const utilisateur = Utilisateur(sequelize);
        const categorie = Categorie(sequelize);
        const signalement = Signalement(sequelize);
        const annonce = Annonce(sequelize);


        //User.hasMany(trucmuche);const { Sequelize } = require('sequelize');
const Utilisateur = require('./utilisateur');
const Categorie = require('./categorie');
const Signalement = require('./signalement');
const Annonce = require('./annonce');

// DB 
async function initModels() {
    const sequelize = new Sequelize(`mariadb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@db:${process.env.DB_HOST}/`, {
        logging: false,
    });

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const utilisateur = Utilisateur(sequelize);
        const categorie = Categorie(sequelize);
        const signalement = Signalement(sequelize);
        const annonce = Annonce(sequelize);

        // Define associations
        categorie.hasMany(annonce);
        annonce.belongsTo(categorie);

        utilisateur.hasMany(annonce);
        annonce.belongsTo(utilisateur);

        utilisateur.hasMany(signalement);
        signalement.belongsTo(utilisateur);

        annonce.hasMany(signalement);
        signalement.belongsTo(annonce);

        // Sync models with database
        await sequelize.sync();

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    return sequelize;
}

module.exports = initModels;
        Categorie.hasMany(Annonce);
        Annonce.belongsTo(Categorie);

        Utilisateur.hasMany(Annonce);
        Annonce.belongsTo(Utilisateur);

        Utilisateur.hasMany(Signalement);
        Signalement.belongsTo(Utilisateur);

        Annonce.hasMany(Signalement);
        Signalement.belongsTo(Annonce);

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    return sequelize;
}

module.exports = initModels;