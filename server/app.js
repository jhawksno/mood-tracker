const express = require('express');
const mongoose = require('mongoose');
const moodRoutes = require('./routes/moods'); // Import mood routes


const path = require('path');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/moodTrackerDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json()); // Middleware for parsing JSON

// Use moodRoutes for any requests to '/moods'
app.use('/moods', moodRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
