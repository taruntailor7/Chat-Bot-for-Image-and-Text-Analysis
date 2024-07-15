const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  imageUrl: String,
  text: String,
  analysis: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Image', ImageSchema);