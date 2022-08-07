const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema ({
    name:                { type: String },
    Description:         { type: String },
    img:                 {
                            data: Buffer,
                            contenType: String
                         }
  })
 
const image = mongoose.model("image", imageSchema)
module.exports = image;