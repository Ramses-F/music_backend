const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');


const CodeSchema = mongoose.Schema({
    code:{type:String},
    dateAjout:{type:Date,default: Date.now()},
    dateModif:{type:Date,default:Date.now()},
    dateSuppress:{type:Date,default:Date.now()},
})



CodeSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Code',CodeSchema)