const express = require('express');
const eventController = require('./../controllers/events');
const router = express.Router();

// Routes related to event
router.post('/', eventController.addEvent);
router.get('/', eventController.getAllEvents);



module.exports = router;