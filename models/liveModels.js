const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Schéma pour les tickets
const TicketSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['standard', 'vip', 'vvip'], // Options possibles pour le type de ticket
        required: true
    },
    prix_reserv: { type: Number, required: true },
    prix_ticket: { type: Number, required: true }
});

// Schéma pour les événements en direct
const LiveSchema = mongoose.Schema({
    lieu: { type: String, required: true },
    adresse: { type: String, required: true },
    tickets: [TicketSchema], // Un événement peut avoir plusieurs types de tickets
    prix_contact: { type: Number, required: true },
    genre: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    artiste: { type: String, required: true },
    contact_artiste: { type: String, required: true },
    date_live: { type: String, required: true },
    heure_live: { type: String, required: true },
    dateAjout: { type: Date, default: Date.now },
    dateModif: { type: Date, default: Date.now },
    dateSuppress: { type: Date, default: Date.now },
    statut: { type: Boolean, required: true, default: true }
});

LiveSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Live', LiveSchema);
