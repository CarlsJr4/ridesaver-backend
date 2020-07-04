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

module.exports = driverRouter;
