const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctormodel');

// Route to add a new doctor
router.post('/add_doctor', async (req, res) => {
  try {
    const { name, id, speciality, hospital, hospitaladdress, contact, email } = req.body;
    const newDoctor = new Doctor({
      name,
      id,
      speciality,
      hospital,
      hospitaladdress,
      contact,
      email,
    });
    await newDoctor.save();
    res.status(201).json({ message: 'Doctor created successfully' });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ message: error.message });
  }
});
router.get('/get_doctor/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const doctor = await Doctor.findOne({ id: id });
      if (doctor) {
        res.json(doctor);
      } else {
        res.status(404).json({ message: 'Doctor not found in database' });
      }
    } catch (error) {
      console.error('Error fetching doctor information:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Route to check if a doctor is present in the database
router.get('/doctor_present', async (req, res) => {
  const { id, hospital } = req.query;
  try {
    const doctor = await Doctor.findOne({ id, hospital });
    if (doctor) {
        res.json(doctor);
    } else {
        res.status(404).json({ message: 'Doctor not found in database' });
    }
  } catch (error) {
    console.error('Error fetching doctor information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
