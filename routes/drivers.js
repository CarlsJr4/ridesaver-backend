const express = require('express');
const { Drivers } = require('../models/events');
const driverRouter = express.Router({ mergeParams: true });

driverRouter.post('/', async (req, res) => {
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

driverRouter
  .route('/:driver_id')
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

module.exports = driverRouter;
