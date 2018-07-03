var mongoose = require('mongoose')

var categorySchema = mongoose.Schema({
  idCategory: {
    type: Number,
    required: true
  },
  category: {
      type: String,
      required: true
  },
  description: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
