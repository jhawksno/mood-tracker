const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
    mood: String,
    dateTime: Date,
    userId: mongoose.Schema.Types.ObjectId, // For future user implementation
});

const Mood = mongoose.model('Mood', moodSchema);

module.exports = Mood;
