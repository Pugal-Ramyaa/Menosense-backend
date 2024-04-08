const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Pred = require('../models/predmodel');

router.post('/add_pred', async (req, res) => {
  try {
    const { prediction, email, recommendation,Date} = req.body;
    const newPred = new Pred({
      email,
      prediction,
      recommendation,
      Date
    });
    await newPred.save();
    res.status(201).json({ message: 'pred created successfully'});
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;