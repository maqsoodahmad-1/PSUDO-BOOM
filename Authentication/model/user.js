const mongoose = require('mongoose');
const userSchema = new mongoose.Schema ({
   first_name: { type: String },
   last_name: { type: String},
   email: { type: String, unique: true },
   password: {type:String },
   token: { type: String },
 });
//password hashing
// userSchema.pre('create', async function(next) {
//   try{
//     const salt = await bcrypt.gensalt(10)
//     const hashedPassword = await bcrypt.hash(this.password,salt)
//     this.password = hashedPassword
//     next();
//   } catch(error){
//     next(error)
//   }
// })



//Exporting 
const User = mongoose.model("user", userSchema);
module.exports=User;


