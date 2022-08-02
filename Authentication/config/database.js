const mongoose = require('mongoose');

//  const { MONGO_URI } = process.env;

exports.connect = () => {
// connecting to the database
  mongoose
      .connect("mongodb://localhost/user"
      , {
       useNewUrlParser: true,
      //  useUnifiedTopology:true,
      //  useCreateIndex: true,
      //  useFindAndModify: false,
      })
    .then( () => {
    console.log("successfully connected to the database");
   })
    .catch((error) => {
      console.log("Data base connection failed exiting now...");
      console.log(error);
      process.exit(1);
     });
}

