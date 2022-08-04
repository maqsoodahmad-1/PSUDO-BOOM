var mongoose = require('mongoose');
//Agency details
const agency = new mongoose.Schema({
    name:         { typee: String },
    type:         { type: String },
    Scheme_id:    { type: Number },
    Scheme_name:  { type: String },
    Location:     { type: String },
    password:     { type: String },
});

const agencies = mongoose.model('agnecy', agency);
module.exports = agencies;