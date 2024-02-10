const Mood = require('../models/Mood');

exports.getAllMoods = async (req, res) => {
    try {
        const moods = await Mood.find();
        res.json(moods);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createMood = async (req, res) => {
    const newMood = new Mood(req.body);
    try {
        await newMood.save();
        res.status(201).json(newMood);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Add other controller functions as needed
