// const Schemes = require('../model/schemes')
const mongoose = require('mongoose');


//  const { MONGO_URI } = process.env;

exports.connect = () => {
// connecting to the database
  mongoose
      .connect("mongodb+srv://maqsodahmad:sihuri@cluster0.04z4jnr.mongodb.net/Schemes?retryWrites=true&w=majority"
      , {
       useNewUrlParser: true,
      //  useUnifiedTopology:true,
      //  useCreateIndex: true,
      //  useFindAndModify: false,
      })
    .then( () => {
    console.log("successfully connected to the database");
    // db = client.db("NewSchemes");
    // schemes = db.collection(Schemes)
   })
    .catch((error) => {
      console.log("Data base connection failed exiting now...");
      console.log(error);
      process.exit(1);
     });
}

