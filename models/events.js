const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Since initially, we don't have any drivers or passengers, what if we allow the client to send IDs?
// Convert strings to objectIDs?
// Or, we use UUID, convert to objectID, then send to client?
// How can we assign IDs to our passenger and driver schemas?
// Probably OK to have everything contained in the events collection since everything in each event is self-contained and won't change anywhere else

const passengerSchema = new Schema({
  name: String,
  nickname: String,
});

// Do you need to manually set an ID for subdocuments?
const driverSchema = new Schema({
  name: String,
  nickname: String,
  seats: Number,
  passengers: [passengerSchema],
});

// Play around with this basic document for now!
const eventSchema = new Schema({
  date: { type: Date, default: Date.now },
  name: String,
  author: String,
  drivers: [driverSchema],
});

const Events = mongoose.model('Event', eventSchema);
const Drivers = mongoose.model('Driver', driverSchema);

module.exports = { Events, Drivers };
