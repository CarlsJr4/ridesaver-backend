const express = require('express');
const router = express.Router();
const { Events, Drivers, Passengers } = require('../models/events');

// Routes to implement:

// The challenge of this app will be figuring out how to handle the various update operations
// Nested routers?
// Router.route() to save space on basic CRUD operations

// Is it possible to compress these so that I dont have to write as many routes?
// Update operators??

// Use middleware to store a DB object in the request body?

// How can we write our routes so that we dont have to keep repeating ourselves whenever we make an update
// to passengers or drivers?
// On paper: Separate routes by event, driver, passenger methods

// PUT passengers between columns
// PUT event details
// PUT driver details
// PUT passenger details
// DELETE event
// DELETE driver
// DELETE passenger

// This module will get really packed soon
// How can we split this module into sub-modules?

// Also need to implement validation and stuff
// Then, config and new routes and stuff
// And also error handling

// How to make code more DRY?

// Attach event to request body for re-use in endpoints
router.param('id', async (req, res, next, id) => {
  try {
    const event = await Events.findById(id);
    req.event = event;
  } catch {
    console.log('Event not found!');
  }
  next();
});

// GET all events
router.get('/', async (req, res) => {
  const allEvents = await Events.find();
  res.send(allEvents);
});

// POST new blank event
router.post('/', async (req, res) => {
  const newEvent = new Events({
    name: 'Ice Skating With Friends',
    author: 'Carl D.',
    drivers: [],
  });
  // Include a default subdocument for the passenger pool
  const passengerPool = new Drivers({
    isPassengerPool: true,
    name: null,
    nickname: null,
    seats: null,
  });
  newEvent.drivers.push(passengerPool);
  const event = await newEvent.save();
  res.send(event);
});

// GET event with specific ID
router.get('/:id', async (req, res) => {
  res.send(req.event);
});

// PUT event information

// DELETE entire event

// POST new passenger to pool
router.post('/:id/passengers', async (req, res) => {
  const event = req.event;
  const newPassenger = new Passengers({
    name: 'Carl D',
    nickname: 'CarlsJr3',
  });
  // There's probably a cleaner way to do this using Mongoose syntax, but this vanilla solution is OK for now
  const passengerPool = event.drivers.find(element => element.isPassengerPool);
  passengerPool.passengers.push(newPassenger);
  event.save();
  res.send(newPassenger);
});

// POST new driver
router.post('/:id/drivers', async (req, res) => {
  const event = req.event;
  const newDriver = new Drivers({
    name: 'Carl D',
    nickname: 'CarlsJr',
    seats: 6,
  });
  event.drivers.push(newDriver);
  event.save();
  res.send(newDriver);
});

module.exports = router;
