const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const initRoutes = require('./routes');
const { Sequelize, DataTypes } = require('sequelize');
const db = require("./models")

require('dotenv').config()

app.use(express.json())

initRoutes(app)




app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
