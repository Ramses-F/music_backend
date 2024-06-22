const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = mongoose.Schema({
    nom: {type:String , require: true},
    prenom:{type:String},
    mdp:{type:String,require:true},
    tel:{type:String,require:true,},
    email:{type:String,require:true},
    dateAjout:{type:Date,default: Date.now()},
    dateModif:{type:Date,default:Date.now()},
    dateSuppress:{type:Date,default:Date.now()},
    statut:{type:Boolean,require:true,default:true}
})



UserSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User',UserSchema)