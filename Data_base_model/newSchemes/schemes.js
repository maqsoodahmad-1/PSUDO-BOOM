 const mongoose = require('mongoose');
 //Scheme Details
 const Schemes = new mongoose.Schema({
    name:        { type: String },
    Category:    { type: String },
    availabe:    { type: Boolean },
    title:       { type: String },
    link:        { type: URL },
    Description: { type: String},
    id:          { type: Number, unique: true },
    Applictaion:  { type: String },
    start_date:  { type: String },
    end_date:    { type: String }

});

const Scheme = mongoose.model("schemes",Schemes);
module.exports = Scheme;