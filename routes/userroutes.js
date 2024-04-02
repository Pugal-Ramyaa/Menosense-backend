const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Usermodel');

router.post('/add_user', async (req, res) => {
  try {
    const { name, email, password,birthday,height,weight,Obesity,Cardiovascular_disease,Menstrual_Irregularity,Thyroid_problem,PCOS,Hypertension,Diabetes } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword, 
      birthday,
      height,
      weight,
      Obesity,
      Cardiovascular_disease,
      Menstrual_Irregularity,
      Thyroid_problem,
      PCOS,
      Hypertension,
      Diabetes,
      DoctorConnect: false,
      DoctorId:0,
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully'});
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/email_present', async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({ message: 'Email found in database' });
    } else {
      res.status(404).json({ message: 'Email not found in database' });
    }
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/user_info', async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials-email' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials-password' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/update_user', async (req, res) => {
  const { email, DoctorConnect, DoctorId } = req.body;
  try {
    const user = await User.findOneAndUpdate({ email }, { DoctorConnect, DoctorId }, { new: true });
    if (user) {
      res.status(200).json({ message: 'User DoctorConnect status updated successfully', user });
    } else {
      res.status(404).json({ message: 'User not found in the database' });
    }
  } catch (error) {
    console.error('Error updating user DoctorConnect status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/updateInfo', async (req, res) => {
  const {
    email,
    name,
    birthday,
    height,
    Obesity,
    Cardiovascular_disease,
    Menstrual_Irregularity,
    Thyroid_problem,
    PCOS,
    Hypertension,
    Diabetes,
  } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        name,
        birthday,
        height,
        Obesity,
        Cardiovascular_disease,
        Menstrual_Irregularity,
        Thyroid_problem,
        PCOS,
        Hypertension,
        Diabetes,
      },
      { new: true }
    );

    if (user) {
      res.status(200).json({ message: 'User information updated successfully', user });
    } else {
      res.status(404).json({ message: 'User not found in the database' });
    }
  } catch (error) {
    console.error('Error updating user information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
