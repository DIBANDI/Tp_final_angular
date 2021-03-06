const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const assignmentRoutes = require('./routes/assignment');
const profRoutes = require('./routes/prof');
const userRoutes = require('./routes/user');
const path = require('path');

mongoose.connect('mongodb+srv://rols:rols@cluster0.hd5un.mongodb.net/assignments?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/assignment', assignmentRoutes);
app.use('/api/prof', profRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;