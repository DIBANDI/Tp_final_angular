const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema({
  nom: { type: String, required: true },
  dateRenduPrevu: { type: Date, required: true },
  dateRenduEnvoye: { type: Date, required: false },
  auteur: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  remarques: { type: String, required: false },
  note: { type: Number, required: false },
});

module.exports = mongoose.model('Assignment', assignmentSchema);