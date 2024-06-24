const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const UserRouter = require('./routes/UserRoute'); // Assurez-vous que le chemin est correct

// Express app setup
const app = express();

// Enable CORS for all routes
app.use(cors());

// Configure Express to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://XNOVA:SqcmEhZU0qKwc9dN@cluster0.bmcdiyt.mongodb.net/')
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

// Handle MongoDB connection error
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Middleware for CORS headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Use User routes
app.use('/api/user', UserRouter);

// Start the server
//const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => {
  //console.log(`Server is running on port ${PORT}`);
//});

module.exports = app;
