const express = require('express');
const passengerRouter = express.Router({ mergeParams: true });

// Endpoints for managing specific passengers
passengerRouter
  .route('/:passenger_id')
  .put(async (req, res) => {
    try {
      const event = req.event;
      const driver = event.drivers.id(req.params.driver_id);
      const passenger = driver.passengers.id(req.params.passenger_id);
      console.log(req.body);
      const { name, nickname } = req.body;
      name && (passenger.name = name);
      nickname ? (passenger.nickname = nickname) : (passenger.nickname = null);
      event.save();
      res.send(passenger);
    } catch {
      res.send('cant find passenger');
    }
  })
  .delete(async (req, res) => {
    try {
      const event = req.event;
      const driver = event.drivers.id(req.params.driver_id);
      driver.passengers.id(req.params.passenger_id).remove();
      event.save();
      res.send(driver);
    } catch {
      res.send('passenger not found');
    }
  });

module.exports = passengerRouter;
