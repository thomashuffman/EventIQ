// server/routes/events.js

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// GET all events
router.get('/', eventController.getAllEvents);

// POST a new event
router.post('/', eventController.createEvent);

module.exports = router;
