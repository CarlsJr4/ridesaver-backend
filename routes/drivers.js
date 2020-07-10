const express = require('express');
const { Drivers, Passengers } = require('../models/events');
const driverRouter = express.Router({ mergeParams: true });
const _ = require('lodash');
const newPassengerRouter = require('./newPassenger');

// Create a new driver
driverRouter.post('/', async (req, res) => {
  try {
    const event = req.event;
    const newDriver = new Drivers(
      _.pick(req.body, ['name', 'nickname', 'seats'])
    );
    event.drivers.push(newDriver);
    event.save();
    res.status(200).send(newDriver._id);
  } catch (err) {
    console.log(err);
  }
});

// Transfer passengers between driver lists
driverRouter.put('/transfer', async (req, res) => {
  try {
    const event = req.event;
    const { startId, destId, sourcePassengers, destPassengers } = req.body;
    const startDriver = event.drivers.id(startId);
    const endDriver = event.drivers.id(destId);
    startDriver.passengers = sourcePassengers;
    endDriver.passengers = destPassengers;
    event.save();
    res.send(event.drivers);
  } catch {
    res.send('error');
  }
});

// Routes involving making changes to a specific driver
driverRouter
  .route('/:driver_id')
  .post(async (req, res) => {
    try {
      const event = req.event;
      const driver = event.drivers.id(req.params.driver_id);
      console.log(req.body);
      const newPassenger = new Passengers(
        _.pick(req.body, ['name', 'nickname'])
      );
      driver.passengers.push(newPassenger);
      // push to passenger list
      event.save();
      res.status(200).send(newPassenger);
      // Send the new passenger
    } catch (err) {
      console.log(err);
    }
  })
  .put(async (req, res) => {
    try {
      const event = req.event;
      const driver = event.drivers.id(req.params.driver_id);
      driver.name = 'Test1';
      driver.nickname = 'Test2';
      driver.seats = 3;
      event.save();
      res.send(driver);
    } catch {
      console.log('could not find driver');
    }
  })
  .delete(async (req, res) => {
    try {
      const event = req.event;
      event.drivers.id(req.params.driver_id).remove();
      event.save();
      res.send(event.drivers);
    } catch {
      res.send('driver not found');
    }
  });

// A route to handle re-ordering a specific driver
driverRouter.put('/:driver_id/reorder', async (req, res) => {
  try {
    const event = req.event;
    const driver = event.drivers.id(req.params.driver_id);
    driver.passengers = req.body.sourcePassengers;
    event.save();
    res.send(event.drivers);
  } catch {
    res.send('driver not found');
  }
});

module.exports = driverRouter;
