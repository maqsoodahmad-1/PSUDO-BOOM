const mongoose = require('mongoose');
//User Details
const userSchema = new mongoose.Schema ({
   first_name:            { type: String },
   last_name:             { type: String},
   Guide_name:            { type: String},
   email:                 { type: String, unique: true },
   password:              { type: String },
   number:                { type: Number },
   Aadhar_Number:         { type: Number },
   Disablity_Type :       { type: String },
   Disability_Percentage: { type: Number },
   UDID_NO:               { type: Number },
   UDID_Card:             { }, 
   token:                 { type: String },
 });


// const Govt_Organization = new mongoose.Schema( {
//   Organization_name:       { type: String },
//   password:                { type: String},
//   Location:                { type: String },
  
// } )
//schema  for tracking the user who has been benifited from schemes

 //Exporting 
const User = mongoose.model("user", userSchema);
module.exports = User;



