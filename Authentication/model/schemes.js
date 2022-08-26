const mongoose = require('mongoose');
const SchemesName = new mongoose.Schema ({
   // SchemeName:{type:string},
   heading:{type:String, required:true},
   description: {type:String, required:true},
   schemeType: {type:String, required:true},
   source:{type:String, required:true},
   link:{type:String, required: true},
   // DisabiltityType:{type: String, required: tr
   // TypeOfBenifits:{type: String, required:true },
   // LaunchDate: { type: String, required:true 

});

const Schemes = mongoose.model('Schemes', SchemesName);
module.exports = Schemes; 