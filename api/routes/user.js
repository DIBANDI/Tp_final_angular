//declaration des variables 
const express = require('express');
const router = express.Router();
const userControlleur = require('../controllers/user');

//definition des routes pour acceder aux routes 
router.post('/signup', userControlleur.signup);
router.post('/login', userControlleur.login);

//exportation de la route
module.exports = router;