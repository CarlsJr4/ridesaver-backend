const express = require('express');
const passengerRouter = express.Router({ mergeParams: true });

// DELETE passenger
// PUT passenger details

// Endpoints for managing specific passengers
passengerRouter.delete('/:passenger_id', async (req, res) => {
  res.send('foo');
});

module.exports = passengerRouter;
