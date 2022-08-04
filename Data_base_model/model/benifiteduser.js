var mongoose = require('mongoose');

const benifited_user = new mongoose.Scheme({
    name:        { type: String },
    id:          { type: Number },
    Scheme_id:   { type: Number }
  });

  const benifitedUsers = mongoose.model('benifitedUser', benifited_user);
  module.exports = benifitedUsers;