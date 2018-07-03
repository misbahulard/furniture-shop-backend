var mongoose = require('mongoose');

var tokenSchema = mongoose.Schema({
  token: {
      type: String,
      require: true
  },
  expire: Date,
}, {
    timestamps: true
});

module.exports = mongoose.model('Token', tokenSchema);
