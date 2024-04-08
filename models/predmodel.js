const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  prediction: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  recommendation: {
    type: [String],
    required: true
  },
  Date: {
    type: Date,
    required: true// Assuming you want to store the birthday as a Date type
  },
});

module.exports = mongoose.model('Pred', userSchema);
