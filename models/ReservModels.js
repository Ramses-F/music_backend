const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');


const ReservSchema = mongoose.Schema({
    email: { type: String, required: true, match: /^\S+@\S+\.\S+$/ }, // Validation d'email
    lieu_live: { type: String, required: true },
    date_live: { type: Date, required: true }, // Utilisation de Date pour la date de l'événement
    heure_live: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: ['standard', 'vip', 'vvip'], // Valeurs possibles pour le type de ticket
    },
    prix_reserv: { type: Number, required: true },
    total: { type: Number, required: true },
    artiste: { type: String, required: true },
    place: { type: Number, required: true },
    dateAjout: { type: Date, default: Date.now },
    dateModif: { type: Date, default: Date.now },
    dateSuppress: { type: Date, default: Date.now },
    statut: { type: Boolean, required: true, default: true }
});



ReservSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Reservation',ReservSchema)