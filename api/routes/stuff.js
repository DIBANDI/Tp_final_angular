//declaration des variables 
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const stuffCtrl = require('../controllers/stuff');

//definition des routes pour acceder aux routes 
router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, multer, stuffCtrl.createAssignment);
router.get('/:id', auth, stuffCtrl.getOneAssignment);
router.put('/:id', auth, multer, stuffCtrl.modifyAssignment);
router.delete('/:id', auth, stuffCtrl.deleteAssignment);

//exportation de la route
module.exports = router;