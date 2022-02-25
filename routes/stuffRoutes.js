const express = require("express");
const router = express.Router();
const stuffCtrl = require("../controllers/stuffController");
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/**Ajout d'un objet */
router.post("/", auth,  multer, stuffCtrl.createThing);

/**Récupération de tous les objets */
router.get("/", auth, stuffCtrl.getAllThing);

/**Récupération d'un objet par son identifiant */
router.get("/:id", auth, stuffCtrl.getOneThing);

/** Modification d'un objet */
router.put("/:id", auth, multer, stuffCtrl.modifyThing);

/**Suppression d'un objet */
router.delete("/:id", auth, stuffCtrl.deleteThing);

module.exports = router;


