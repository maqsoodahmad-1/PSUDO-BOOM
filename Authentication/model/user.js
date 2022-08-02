const mongoose = require('mongoose');
const userSchema = new mongoose.Schema ({
   first_name: { type: String },
   last_name: { type: String},
   email: { type: String, unique: true },
   password: { type: String },
   token: { type: String },
 });

//Exporting 

const User = mongoose.model("user", userSchema);
module.exports=User;


