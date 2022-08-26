const mongoose = require('mongoose');
const mapSchema = new mongoose.Schema ({
 centerName:{ type:String, required:true },
 State:{ type:String, required: true },
 Location: { type:String, required: true },
 geolocation: [
        // {type:String, required: true,},
        // {type:String, required: true}
],
 });
const map = mongoose.model("loaction", mapSchema);
module.exports = map;
