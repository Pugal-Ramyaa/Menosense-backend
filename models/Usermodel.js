const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true// Assuming you want to store the birthday as a Date type
  },
  height: {
    type: Number,
    required: true// Assuming you want to store the height as a Number type
  },
  weight: {
    type: Number,
    required: true // Assuming you want to store the weight as a Number type
  },
  // Thyroid_problem: 0, PCOS: false, Hypertension: true, Diabetes: false
  Obesity: {
    type: Boolean,
    required: true
  },
  Cardiovascular_disease:{
    type: Boolean,
    required: true
  },
  Menstrual_Irregularity: {
    type: Number,
    required: true,
  },
  Thyroid_problem:{
    type: Number,
    required: true,
  },
  PCOS:{
    type: Boolean,
    required: true,
  },
  Hypertension:{
    type: Boolean,
    required: true,
  },
  Diabetes:{
    type: Boolean,
    required: true,
  },
  DoctorConnect:{
    type:Boolean,
    required:true,
  },
  DoctorId:{
    type:String,
    required:true,
  }
});

module.exports = mongoose.model('User', userSchema);
