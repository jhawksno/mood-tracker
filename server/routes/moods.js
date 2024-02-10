const express = require('express');
const router = express.Router();
const moodsController = require('../controllers/moodsController');

router.get('/', moodsController.getAllMoods);
router.post('/', moodsController.createMood);

module.exports = router;
