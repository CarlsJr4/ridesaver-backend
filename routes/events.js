const express = require('express');
const eventRouter = express.Router();
const driverRouter = require('./drivers');
const newPassengerRouter = require('./newPassenger');
const passengerRouter = require('./passengers');
const { Events, Drivers } = require('../models/events');

// TODO:
// Validation
// Config
// Error handling
// Sync front-end with backend

// Nested routers to split functionality to different modules
eventRouter.use('/:event_id/drivers', driverRouter);
eventRouter.use('/:event_id/newpassenger', newPassengerRouter);
eventRouter.use('/:event_id/drivers/:driver_id/passengers', passengerRouter);

// So that this event can be accessed by all nested routes
eventRouter.param('event_id', async (req, res, next, id) => {
  try {
    const event = await Events.findById(id);
    req.event = event;
  } catch {
    console.log('Event not found!');
  }
  next();
});

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
    // Default subdocument for the passenger pool
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
  .route('/:event_id')
  .get(async (req, res) => {
    res.send(req.event);
  })
  // For changing event title and date/time
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
