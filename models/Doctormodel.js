const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  hospitaladdress: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  
});

module.exports = mongoose.model('Doctor', doctorSchema);
