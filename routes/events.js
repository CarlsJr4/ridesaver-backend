const express = require('express');
const eventRouter = express.Router();
const driverRouter = require('./drivers');
const passengerRouter = require('./passengers');
const { Events, Drivers } = require('../models/events');

// Routes to implement:
// PUT passengers between columns
// PUT driver details
// PUT passenger details
// DELETE driver
// DELETE passenger

// Also need to implement validation and stuff
// Then, config and new routes and stuff
// And also error handling

eventRouter.use('/:id/drivers', driverRouter);
eventRouter.use('/:id/passengers', passengerRouter);

eventRouter.param('id', async (req, res, next, id) => {
  try {
    const event = await Events.findById(id);
    req.event = event;
  } catch {
    console.log('Event not found!');
  }
  next();
});

// Default route
eventRouter
  .route('/')
  .get(async (req, res) => {
    const allEvents = await Events.find();
    res.send(allEvents);
  })
  .post(async (req, res) => {
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

// Routes that require a specific event ID
eventRouter
  .route('/:id')
  .get(async (req, res) => {
    res.send(req.event);
  })
  .patch(async (req, res) => {
    try {
      const event = await Events.findByIdAndUpdate(
        req.params.id,
        {
          name: 'Ice Skating With Friends',
        },
        {
          new: true,
        }
      );
      res.send(event);
    } catch {
      console.log('error');
    }
  })
  .delete(async (req, res) => {
    try {
      await Events.findByIdAndDelete(req.params.id);
      res.send(await Events.find());
    } catch {
      console.log('err');
    }
  });

module.exports = eventRouter;
