// Import required modules
const express = require('express');
const router = express.Router();
const Vitals = require('../models/Vitals'); // Import the Vitals model
const Logs = require('../models/Logs'); // Import the Logs model
const MergedData = require('../models/timelinemodel'); // Import the MergedData model

// Define the route to merge data from Vitals and Logs collections
router.get('/timelineData', async (req, res) => {
  try {
    // Assuming you want to merge data for a specific user (identified by their email)
    const userEmail = req.query.email;

    // First, query the Vitals collection for data related to the user
    const vitalsData = await Vitals.find({ email: userEmail });

    // Next, query the Logs collection for data related to the same user
    const logsData = await Logs.find({ email: userEmail });

    // Merge the data from both collections into documents for the MergedData collection
    const mergedDocuments = [];
    vitalsData.forEach(vitals => {
      // Find the corresponding log entry (if any) based on the Date
      const matchingLog = logsData.find(log => log.Date.getTime() === vitals.Date.getTime());
      // Create a merged document combining data from both collections
      const mergedDocument = {
        email: userEmail,
        // Include fields from the Vitals collection
        hb: vitals.hb,
        sbp: vitals.sbp,
        // Include fields from the Logs collection
        heartRate: matchingLog ? matchingLog.heartRate : null, // Example of merging data from both collections
        // Include other fields as needed
        Date: vitals.Date, // Assuming the Date field is present in both collections
      };
      // Add the merged document to the array
      mergedDocuments.push(mergedDocument);
    });

    // Insert the merged documents into the MergedData collection
    await MergedData.create(mergedDocuments);

    res.status(200).json({ message: 'Merged data inserted successfully' });
  } catch (error) {
    console.error('Error merging data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
