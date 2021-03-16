const Prof = require('../models/Prof');
const fs = require('fs');

exports.createProf = (req, res, next) => {
    const profObject = JSON.parse(req.body.prof);
    delete profObject._id;
    const prof = new Prof({
      ...profObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    prof.save()
      .then(() => res.status(201).json({ message: 'Le Prof a été enregistré avec succes!'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.getOneProf = (req, res, next) => {
  Prof.findOne({
    _id: req.params.id
  }).then(
    (prof) => {
      res.status(200).json(prof);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyProf = (req, res, next) => {
    const profObject = req.file ?
      {
        ...JSON.parse(req.body.prof),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
      Prof.updateOne({ _id: req.params.id }, { ...profObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Les données du prof ont été modifiées!'}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.deleteProf = (req, res, next) => {
    Prof.findOne({ _id: req.params.id })
      .then(prof => {
        const filename = prof.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Prof.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Les données du prof supprimées avec succes !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.getAllProf = (req, res, next) => {
  Prof.find().then(
    (prof) => {
      res.status(200).json(prof);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};