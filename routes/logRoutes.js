const express = require('express');
const router = express.Router();
const Logs = require('../models/Logmodel');
router.post('/add_log', async (req, res) => {
  const { email, Date, heartRate, weight, sleepingProblems, hotFlashes, nightSweats, chills, fatigue, headAche, vaginalDryness, moodSwings, ...symptoms } = req.body;

  try {
    // Parse numeric values to integers
    const parsedHeartRate = parseInt(heartRate);
    const parsedWeight = parseInt(weight);
    const parsedSleepingProblems = parseInt(sleepingProblems);
    const parsedHotFlashes = parseInt(hotFlashes);
    const parsedNightSweats = parseInt(nightSweats);
    const parsedChills = parseInt(chills);
    const parsedFatigue = parseInt(fatigue);
    const parsedHeadAche = parseInt(headAche);
    const parsedVaginalDryness = parseInt(vaginalDryness);
    const parsedMoodSwings = parseInt(moodSwings);

    // Fetch existing logs from the database
    const existingLogs = await Logs.find({ email, Date });

    if (existingLogs.length > 0) {
      // Calculate average symptom values
      const numLogs = existingLogs.length + 1; // Including the new log
      const averageSymptoms = {
        heartRate: Math.round((existingLogs.reduce((acc, log) => acc + log.heartRate, 0) + parsedHeartRate) / numLogs),
        weight: Math.round((existingLogs.reduce((acc, log) => acc + log.weight, 0) + parsedWeight) / numLogs),
        sleepingProblems: Math.round((existingLogs.reduce((acc, log) => acc + log.sleepingProblems, 0) + parsedSleepingProblems) / numLogs),
        hotFlashes: Math.round((existingLogs.reduce((acc, log) => acc + log.hotFlashes, 0) + parsedHotFlashes) / numLogs),
        nightSweats: Math.round((existingLogs.reduce((acc, log) => acc + log.nightSweats, 0) + parsedNightSweats) / numLogs),
        chills: Math.round((existingLogs.reduce((acc, log) => acc + log.chills, 0) + parsedChills) / numLogs),
        fatigue: Math.round((existingLogs.reduce((acc, log) => acc + log.fatigue, 0) + parsedFatigue) / numLogs),
        headAche: Math.round((existingLogs.reduce((acc, log) => acc + log.headAche, 0) + parsedHeadAche) / numLogs),
        vaginalDryness: Math.round((existingLogs.reduce((acc, log) => acc + log.vaginalDryness, 0) + parsedVaginalDryness) / numLogs),
        moodSwings: Math.round((existingLogs.reduce((acc, log) => acc + log.moodSwings, 0) + parsedMoodSwings) / numLogs),
        // Add other symptoms here
      };

      // Update first log with average symptom values
      const firstLog = existingLogs[0];
      firstLog.heartRate = averageSymptoms.heartRate;
      firstLog.weight = averageSymptoms.weight;
      firstLog.sleepingProblems = averageSymptoms.sleepingProblems;
      firstLog.hotFlashes = averageSymptoms.hotFlashes;
      firstLog.nightSweats = averageSymptoms.nightSweats;
      firstLog.chills = averageSymptoms.chills;
      firstLog.fatigue = averageSymptoms.fatigue;
      firstLog.headAche = averageSymptoms.headAche;
      firstLog.vaginalDryness = averageSymptoms.vaginalDryness;
      firstLog.moodSwings = averageSymptoms.moodSwings;
      // Update other symptoms here
      await firstLog.save();

      // Remove other logs
      await Logs.deleteMany({ _id: { $in: existingLogs.slice(1).map(log => log._id) } });

      res.status(200).json({ message: 'Logs updated successfully' });
    } else {
      // Insert new log
      const newLog = new Logs({ email, Date, heartRate: parsedHeartRate, weight: parsedWeight, sleepingProblems: parsedSleepingProblems, hotFlashes: parsedHotFlashes, nightSweats: parsedNightSweats, chills: parsedChills, fatigue: parsedFatigue, headAche: parsedHeadAche, vaginalDryness: parsedVaginalDryness, moodSwings: parsedMoodSwings, ...symptoms });
      await newLog.save();

      res.status(201).json({ message: 'New log inserted successfully' });
    }
  } catch (error) {
    console.error('Error handling log:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Utility function to convert null values to 0
function convertNullToZero(value) {
  return value === null ? 0 : value;
}

router.get('/average_days', async (req, res) => {
  const { email,date } = req.query;

  try {
    // Get the current date
    const currentDate = new Date(date);

    // Calculate the starting date of the current month
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Calculate the ending date by adding 4 weeks (28 days) to the start date
    const endDate = new Date(startDate.getTime() + 27 * 24 * 60 * 60 * 1000); // 27 days to avoid crossing into the next month

    // Fetch logs for the specified email and date range
    const logs = await Logs.find({ email, Date: { $gte: startDate, $lte: endDate } });

    // Log the fetched logs for debugging
    console.log('Fetched logs:', logs);

    // Initialize sumSymptoms with 0 values for each symptom
    const sumSymptoms = {
      sleepingProblems: 0,
      hotFlashes: 0,
      nightSweats: 0,
      chills: 0,
      fatigue: 0,
      headAche: 0,
      vaginalDryness: 0,
      moodSwings: 0
    };

    // Calculate the average symptom values for each week
    const averageSymptoms = [];
    for (let i = 0; i < 5; i++) {
      // Calculate the starting and ending date of each week
      const weekStartDate = new Date(startDate.getTime() + i * 7 * 24 * 60 * 60 * 1000);
      const weekEndDate = new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000);

      // Adjust the start date to be the next Monday if the current start date is not Monday
      if (weekStartDate.getDay() !== 1) {
        const daysToAdd = 1 - weekStartDate.getDay(); // Calculate the number of days to add to reach Monday
        weekStartDate.setDate(weekStartDate.getDate() + daysToAdd); // Add the days to reach Monday
      }

      // Adjust the end date accordingly
      weekEndDate.setDate(weekStartDate.getDate() + 6); // Add 6 days to reach Sunday

      const logsInWeek = logs.filter(log => log.Date >= weekStartDate && log.Date <= weekEndDate);

      // Log symptom values from each log for debugging
      logsInWeek.forEach((log, index) => {
        console.log(`Log ${index + 1} symptom values:`, log);
      });

      const numLogsInWeek = logsInWeek.length;
      const sumSymptomsInWeek = { ...sumSymptoms };

      logsInWeek.forEach(log => {
        for (const symptom in sumSymptomsInWeek) {
          sumSymptomsInWeek[symptom] += convertNullToZero(log[symptom]);
        }
      });

      const averageSymptomsInWeek = {};
      for (const symptom in sumSymptomsInWeek) {
        averageSymptomsInWeek[symptom] = numLogsInWeek > 0 ? sumSymptomsInWeek[symptom] / numLogsInWeek : 0;
      }

      averageSymptoms.push({
        startDate: weekStartDate.toISOString().split('T')[0], // Convert to ISO string and extract date part
        endDate: weekEndDate.toISOString().split('T')[0], // Convert to ISO string and extract date part
        symptoms: averageSymptomsInWeek
      });
    }

    // Return the list of 5 weeks' average symptom values
    res.json({ averageSymptoms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/top_symptoms', async (req, res) => {
  const { email } = req.query;

  try {
    // Fetch all logs for the specified email
    const logs = await Logs.find({ email });

    if (logs.length === 0) {
      return res.status(404).json({ message: 'No logs found for the specified email' });
    }

    // Calculate the average of respective symptoms
    const numLogs = logs.length;
    const sumSymptoms = {
      sleepingProblems: 0,
      hotFlashes: 0,
      nightSweats: 0,
      chills: 0,
      fatigue: 0,
      headAche: 0,
      vaginalDryness: 0,
      moodSwings: 0
    };

    logs.forEach(log => {
      for (const symptom in sumSymptoms) {
        sumSymptoms[symptom] += log[symptom];
      }
    });

    const averageSymptoms = {};
    for (const symptom in sumSymptoms) {
      averageSymptoms[symptom] = sumSymptoms[symptom] / numLogs;
    }

    // Sort the symptoms based on their average values
    const sortedSymptoms = Object.entries(averageSymptoms)
      .sort(([, avgA], [, avgB]) => avgB - avgA)
      .map(([symptom]) => symptom);

    // Return the top 4 symptoms with the highest average
    const top4Symptoms = sortedSymptoms.slice(0, 4);

    res.json({ topSymptoms: top4Symptoms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/logs', async (req, res) => {
  const { email, date } = req.query;

  try {
    const logs = await Logs.find({ email, Date: date });
    if (logs.length === 0) {
      // If no logs were found for the specified email and date, return a 404 error
      return res.status(404).json({ message: 'Logs not found for the specified date' });
    }
    // If logs were found, return them
    else{
      return res.json(logs);
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/average_days_in_week', async (req, res) => {
  const { email, date } = req.query;

  try {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = parsedDate.getMonth();

    // Calculate the start and end dates for each week in the month
    const weeks = [];
    for (let i = 0; i < 5; i++) {
      const startDate = new Date(year, month, i * 7 + 1);
      const endDate = new Date(year, month, (i + 1) * 7);
      weeks.push({ startDate, endDate });
    }

    // Fetch logs for the specified user and month
    const logs = await Logs.find({
      email,
      Date: {
        $gte: new Date(year, month, 1),
        $lte: new Date(year, month + 1, 0) // Last day of the month
      }
    });

    // Calculate average symptom values for each week
    const averageSymptoms = [];
    for (const week of weeks) {
      const { startDate, endDate } = week;

      const logsInWeek = logs.filter(log => {
        const logDate = new Date(log.Date);
        return logDate >= startDate && logDate <= endDate;
      });

      const sumSymptoms = {
        sleepingProblems: 0,
        hotFlashes: 0,
        nightSweats: 0,
        chills: 0,
        fatigue: 0,
        headAche: 0,
        vaginalDryness: 0,
        moodSwings: 0
      };

      logsInWeek.forEach(log => {
        for (const symptom in sumSymptoms) {
          sumSymptoms[symptom] += convertNullToZero(log[symptom]);
        }
      });

      const numLogsInWeek = logsInWeek.length;
      const averageSymptomsInWeek = {};
      for (const symptom in sumSymptoms) {
        for (const symptom in sumSymptoms) {
          averageSymptomsInWeek[symptom] = numLogsInWeek > 0 ? Math.round(sumSymptoms[symptom] / numLogsInWeek) : 0;
      }
      
      }

      averageSymptoms.push({
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        symptoms: averageSymptomsInWeek
      });
    }

    res.json({ averageSymptoms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/average_months_in_year', async (req, res) => {
  const { email, year } = req.query;

  try {
    // Parse the year string into a number
    const parsedYear = parseInt(year);

    // Initialize an array to hold average symptom values for each month
    const averageSymptoms = [];

    // Loop through each month of the year (from January to December)
    for (let month = 0; month < 12; month++) {
      // Calculate the starting and ending dates for the current month
      const startDate = new Date(parsedYear, month, 1);
      const endDate = new Date(parsedYear, month + 1, 0);

      // Fetch logs for the specified email and date range
      const logs = await Logs.find({ email, Date: { $gte: startDate, $lte: endDate } });

      // Initialize sumSymptoms with 0 values for each symptom
      const sumSymptoms = {
        sleepingProblems: 0.0,
        hotFlashes: 0.0,
        nightSweats: 0.0,
        chills: 0.0,
        fatigue: 0.0,
        headAche: 0.0,
        vaginalDryness: 0.0,
        moodSwings: 0.0
      };

      // Calculate the sum of symptom values for the current month
      logs.forEach(log => {
        for (const symptom in sumSymptoms) {
          sumSymptoms[symptom] += convertNullToZero(log[symptom]);
        }
      });

      // Calculate the average symptom values for the current month
      const numLogs = logs.length;
      const averageSymptomsOfMonth = {};
      for (const symptom in sumSymptoms) {
        averageSymptomsOfMonth[symptom] = numLogs > 0.0 ? Math.round(sumSymptoms[symptom] / numLogs) : 0.0;
      }

      // Add the average symptom values for the current month to the array
      averageSymptoms.push({
        month: month + 1, // Month index starts from 0, so add 1 to get the actual month number
        year: parsedYear,
        symptoms: averageSymptomsOfMonth
      });
    }

    // Return the list of average symptom values for each month of the year
    res.json({ averageSymptoms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// router.get('/symptomlogs', async (req, res) => {
//   const { email } = req.query;

//   try {
//     const logs = await Logs.find({ email });
//     if (logs.length === 0) {
//       return res.status(404).json({ message: 'Logs not found for the specified email' });
//     }
    
//     // Extract symptom values and dates from logs
//     const symptomLogs = logs.map(log => ({
//       Date: log.Date,
//       symptoms: [
//         { name: 'sleepingProblems', value: log.sleepingProblems },
//         { name: 'hotFlashes', value: log.hotFlashes },
//         { name: 'nightSweats', value: log.nightSweats },
//         { name: 'chills', value: log.chills },
//         { name: 'fatigue', value: log.fatigue },
//         { name: 'headAche', value: log.headAche },
//         { name: 'vaginalDryness', value: log.vaginalDryness },
//         { name: 'moodSwings', value: log.moodSwings }
//       ]
//     }));

//     // Sort the symptom values within each log
//     symptomLogs.forEach(log => {
//       log.symptoms.sort((a, b) => b.value - a.value); // Sort in descending order of values
//     });

//     // Extract only the top 3 symptoms from each log
//     symptomLogs.forEach(log => {
//       log.symptoms = log.symptoms.slice(0, 3);
//     });

//     res.status(200).json(symptomLogs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

module.exports = router;
