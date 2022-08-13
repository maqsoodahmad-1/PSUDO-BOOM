// const { MongoGridFSChunkError } = require('mongodb');
const mongoose = require('mongoose');
//User Details
const userSchema = new mongoose.Schema ({
   first_name:            { type: String, required: true, maxlength: 60 },
   last_name:             { type: String, required: true, maxlength: 60 },
   Guide_name:            { type: String, maxlength: 60 },
   email:                 { type: String, unique: true },
   password:              { type: String, required: true, minlength:8, maxlength: 25 },
   number:                { type: Number, required: true, length: 10 },
   Aadhar_Number:         { type: Number, required: true, length: 12 },
   Disability_Type :      { type: String, required: true, length: 100 },
   Disability_Percentage: { type: Number, required: true, },
   UDID_NO:               { type: Number, required: true, length: 18 },
  message:                { type: String },
  status:                 { 
                            type: String,
                            enum: ['Pending', 'Active'],
                            default: 'Pending'
                          },
  confirmationCode:       {
                           type:String,
                           unique:true
                           },
 });


// const Govt_Organization = new mongooese.Schema( {
//   Organization_name:       { type: String },
//   password:                { type: String},
//   Location:                { type: String },
  
// } )
//schema  for tracking the user who has been benifited from schemes

//console.log(UDID_Card)
 //Exporting 
const User = mongoose.model("user", userSchema);
module.exports = User;




