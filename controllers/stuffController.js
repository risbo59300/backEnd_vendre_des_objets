const Thing = require("../models/thing");

// fs= file system. Expose des méthode pour interargir 
//avec le système fichier du serveur.
const fs = require("fs");

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet crée !" }))
    .catch(() => res.status(400).json({ error }));
};

exports.getAllThing = (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((thing) => res.status(404).json({ error }));
};

exports.modifyThing = (req, res, next) => {
  const thingObject = req.file
    ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Thing.updateOne(
    { _id: req.params.id },
    { ...thingObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet Modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      const filename = thing.imageUrl.split("/images")[1];
      //suppression des fichiers du système fichiers.
      fs.unlink(`images/${filename}`, () => {
        Thing.findOne({ _id: req.params.id })
          .then((thing) => {
            if (!thing) {
              res
                .status(404)
                .json({ error: new Error("Cet objet n'existe pas") });
            }
            if (thing.userId !== req.auth.userId) {
              res
                .status(400)
                .json({ error: new Error("Réquête non autorisé!") });
            }
            Thing.deleteOne({ _id: req.params.id }).then(() =>
              res.status(200).json({ message: "Objet supprimé" })
            );
          })
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
