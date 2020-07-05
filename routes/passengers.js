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
  res.send('foo');
});

module.exports = passengerRouter;
