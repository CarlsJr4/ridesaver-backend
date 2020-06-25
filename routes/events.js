const express = require('express');
const router = express.Router();
const { Events, Drivers } = require('../models/events');

// Routes to implement
// GET all events
// GET event of specific ID
// DELETE event
// PUT new driver
// PUT new passenger

// Also need to implement validation and stuff
// Then, config and new routes and stuff
// And also error handling

// GET all events
router.get('/', async (req, res) => {
  const allEvents = await Events.find();
  res.send(allEvents);
});

// GET event with specific ID
router.get('/:id', async (req, res) => {
  const event = await Events.findById(req.params.id);
  res.send(event);
});

// POST new driver
router.post('/:id/newdriver', async (req, res) => {
  const event = await Events.findById(req.params.id);
  const newDriver = new Drivers({
    name: 'Carl D',
    nickname: 'CarlsJr',
  });
  event.drivers.push(newDriver);
  event.save();
  res.send(event);
});

// POST new blank event (need to include a default driver that holds free passengers)
// How to handle unique driver scenario?
router.post('/new', async (req, res) => {
  const newEvent = new Events({
    name: 'Ice Skating With Friends',
    author: 'Carl D.',
    drivers: [],
  });
  const event = await newEvent.save();
  res.send(event);
});

module.exports = router;