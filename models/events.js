const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passengerSchema = new Schema({
  name: String,
  nickname: String,
});

const driverSchema = new Schema({
  isPassengerPool: Boolean,
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
