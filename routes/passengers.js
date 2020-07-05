const express = require('express');
const passengerRouter = express.Router({ mergeParams: true });

// DELETE passenger
// PUT passenger details

// Need to manage nested subdocuments

// Idea:
// Get document
// Get driver subdocument using ID
// Manually set the array?
// Or do subdocument methods work for nested subdocuments?
// When changing the order of things, frontend should send the entire dataset?

// Endpoints for managing specific passengers
passengerRouter.delete('/:passenger_id', async (req, res) => {
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
