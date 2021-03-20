//declaration des variables 
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const profController = require('../controllers/prof');

//definition des routes pour acceder aux routes 
router.get('/', auth, profController.getAllProf);
router.post('/', auth, multer, profController.createProf);
router.get('/:id', auth, profController.getOneProf);
router.put('/:id', auth, multer, profController.modifyProf);
router.delete('/:id', auth, profController.deleteProf);

//exportation de la route
module.exports = router;