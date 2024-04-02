const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userroutes');
const logRoutes=require('./routes/logRoutes')

const doctorRoute = require('./routes/doctorRoute');
const VitalRoute= require('./routes/VitalRoute');
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://pugalramyaa:pugal@menosense.rt7yrlq.mongodb.net/user',).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


// Routes
app.use('/api/auth', userRoutes);
app.use('/api',logRoutes);
app.use('/api',doctorRoute);
app.use('/api',VitalRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
