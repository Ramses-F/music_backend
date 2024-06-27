const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');


const ReservSchema = mongoose.Schema({
    nom: {type:String , require: true},
    prenom:{type:String, require: true},
    email:{type:String,require:true},
    lieu_live:{type:String,require:true},
    date_live:{type:String,require:true},
    heure_live:{type:String,require:true},
    prix_reserv:{type:Number,require:true},
    total:{type:Number,require:true},
    place:{type:Number,require:true},
    dateAjout:{type:Date,default: Date.now()},
    dateModif:{type:Date,default:Date.now()},
    dateSuppress:{type:Date,default:Date.now()},
    statut:{type:Boolean,require:true,default:true}
})



ReservSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Reservation',ReservSchema)