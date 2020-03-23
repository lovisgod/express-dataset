const express = require('express');
const eventController = require('./../controllers/events');
const router = express.Router();

// Route related to delete events
router.delete('/', eventController.eraseEvents);

module.exports = router;