const express = require('express');
const router = express.Router();
const Vital = require('../models/Vitalmodel');

// Route to add a new doctor
router.post('/add_vitals', async (req, res) => {
  try {
    const { email,hb,sbp,dbp,fsh,prl,e2,lh,p4,vd,tsh,ft3,ft4,hr,gnrh,hdl,tg,Date } = req.body;
    const newVital = new Vital({
        email,hb,sbp,dbp,fsh,prl,e2,lh,p4,vd,tsh,ft3,ft4,hr,gnrh,hdl,tg,Date
    });
    await newVital.save();
    res.status(201).json({ message: 'Vital created successfully' });
  } catch (error) {
    console.error("Error adding Vital:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/vitals/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const latestVital = await Vital.findOne({ email: email }).sort({ Date: -1 }).limit(1);
    res.status(200).json(latestVital);
  } catch (error) {
    console.error("Error fetching latest vital by email:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/allvitals/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const Vitaldata = await Vital.find({ email: email });
    res.status(200).json(Vitaldata);
  } catch (error) {
    console.error("Error fetching latest vital by email:", error);
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;