const express = require('express');
const actorsController = require('../controllers/actors');
const router = express.Router();

// Routes related to actor.

router.put('/', actorsController.updateActor);

module.exports = router;