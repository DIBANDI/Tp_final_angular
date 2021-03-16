//declaration des variables 
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const profControlleur = require('../controllers/stuff');

//definition des routes pour acceder aux routes 
router.get('/', auth, profControlleur.getAllProf);
router.post('/', auth, multer, profControlleur.createProf);
router.get('/:id', auth, profControlleur.getOneProf);
router.put('/:id', auth, multer, profControlleur.modifyProf);
router.delete('/:id', auth, profControlleur.deleteProf);

//exportation de la route
module.exports = router;