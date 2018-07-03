var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  username: {
      type: String,
      require: true
  },
  password: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
