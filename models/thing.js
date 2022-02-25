const mongoose = require('mongoose');

//Creation d'un schema de données
const thingSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    userId: {type: String, required: true},
    price: {type: Number, required: true},  
});

//TRansformation du modèle en un modèle utilisable
module.exports = mongoose.model('Thing', thingSchema);

