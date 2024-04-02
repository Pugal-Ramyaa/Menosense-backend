const mongoose = require('mongoose');

const vitalSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  hb: {
    type: Number,
    required: true// Assuming you want to store the height as a Number type
  },
  sbp: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  dbp: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  fsh: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  prl: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  e2: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  lh: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  p4: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  vd: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  tsh: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  ft3: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  ft4: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  hr: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  hdl: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  tg: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  gnrh: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  Date: {
    type: Date,
    required: true// Assuming you want to store the birthday as a Date type
  },
});

module.exports = mongoose.model('Vitals', vitalSchema);
