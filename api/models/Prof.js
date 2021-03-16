//definition de la constante mongoose 
const mongoose = require('mongoose');

//schematisation de la collection prof
const profSchema = mongoose.Schema({
  nom: { type: String, required: true },
  matiere: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
});

//exportation de du module
module.exports = mongoose.model('Prof', profSchema);