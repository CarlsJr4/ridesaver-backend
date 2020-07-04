const express = require('express');
const { Passengers } = require('../models/events');
const passengerRouter = express.Router({ mergeParams: true });

passengerRouter.post('/', async (req, res) => {
  const event = req.event;
  const newPassenger = new Passengers({
    name: 'Carl D',
    nickname: 'CarlsJr3',
  });
  const passengerPool = event.drivers.find(element => element.isPassengerPool);
  passengerPool.passengers.push(newPassenger);
  event.save();
  res.send(newPassenger);
});

module.exports = passengerRouter;
