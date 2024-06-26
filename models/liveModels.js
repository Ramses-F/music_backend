const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');


const LiveSchema = mongoose.Schema({
    lieu: {type:String , require: true},
    adresse: {type:String , require: true},
    prix_ticket: {type:Number , require: true},
    //extrait_album: {type:String , require: true},
    //image_artiste: {type:String , require: true},
    genre:{type:String, require:true},
    latitude:{type:Number,require:true},
    longitude:{type:Number,require:true,},
    artiste:{type:String,require:true},
    contact_artiste:{type:String,require:true},
    date_live:{type:String,require:true},
    dateAjout:{type:Date,default: Date.now()},
    dateModif:{type:Date,default:Date.now()},
    dateSuppress:{type:Date,default:Date.now()},
    statut:{type:Boolean,require:true,default:true}
})



LiveSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Live',LiveSchema)