//declaration des variables 
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

//definition des routes pour acceder aux routes 
router.post('/signup', userController.signup);
router.post('/login', userController.login);

//exportation de la route
module.exports = router;