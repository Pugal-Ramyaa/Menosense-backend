const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb+srv://pugalramyaa:pugal@menosense.rt7yrlq.mongodb.net/user", )
.then(() => {
  console.log("Connected to MongoDB");

  // Define POST endpoint to add a user
  app.post("/api/add_user", async (req, res) => {
    try {
      // Create a new user instance based on request body
      const user = new User(req.body);
      
      // Save the user to the database
      const savedUser = await user.save();

      // Respond with the saved user data
      res.status(200).json(savedUser);
    } catch (error) {
      // Handle any errors that occur during user creation or saving
      res.status(400).json({ error: error.message });
    }
  });

  // Start the server
  app.listen(2000, () => {
    console.log("Server is running on port 2000");
  });
})
.catch((error) => {
  // Handle MongoDB connection error
  console.error("Error connecting to MongoDB:", error);
  console.error("MongoDB connection error:", error.message);
});
