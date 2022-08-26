const mongoose = require('mongoose');
// const mongo = require('mongodb').MongoClient;

//  const { MONGO_URI } = process.env;

exports.connect = () => {
// connecting to the database
  mongoose
      .connect(
        'mongodb://localhost:27107/newSchemes'
      , {
       useNewUrlParser: true,
        // useUnifiedTopology:true,
        //useCreateIndex: true,
       // useFindAndModify: false,
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

