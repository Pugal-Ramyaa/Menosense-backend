const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  heartRate: {
    type: Number,
    required: true// Assuming you want to store the height as a Number type
  },
  weight: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  sleepingProblems: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  hotFlashes: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  nightSweats: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  chills: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  fatigue: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  headAche: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  vaginalDryness: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  moodSwings: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  Date: {
    type: Date,
    required: true// Assuming you want to store the birthday as a Date type
  },
});

module.exports = mongoose.model('Logs', logSchema);
