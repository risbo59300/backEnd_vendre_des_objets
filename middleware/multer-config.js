const multer = require('multer');

//Declaration de type d'extension accépter
const MIME_TYPE = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

/**
 * Indique à multer ou enrégistrer les fichiers entrants :
 */
const storageImage = multer.diskStorage({
    // indique à multer d'enrégistrer les fichiers dans le dossier "image"
    destination: (req, file, callback)=>{
        callback(null, 'images');
    },
    // Indique à multer d'utiliser le nom d'origine, de remplacer les espace par des underscores,
    //d'utilise extension pour resoudre le problème d'extension de fichier.
    filename:(req, file, callback)=>{
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPE[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storageImage}).single('image');