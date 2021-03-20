//declaration des variables 
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const assignmentController = require('../controllers/assignment');

//definition des routes pour acceder aux routes 
router.get('/', auth, assignmentController.getAllAssignment);
router.post('/', auth, multer, assignmentController.createAssignment);
router.get('/:id', auth, assignmentController.getOneAssignment);
router.put('/:id', auth, multer, assignmentController.modifyAssignment);
router.delete('/:id', auth, assignmentController.deleteAssignment);

//exportation de la route
module.exports = router;