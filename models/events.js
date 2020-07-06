const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passengerSchema = new Schema({
  name: { type: String, required: true },
  nickname: String,
});

const driverSchema = new Schema({
  isPassengerPool: Boolean,
  name: { type: String, required: true },
  nickname: String,
  seats: { type: Number, required: true, min: 1 },
  passengers: [passengerSchema],
});

const eventSchema = new Schema({
  date: { type: Date, default: Date.now, required: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
  drivers: [driverSchema],
});

const Events = mongoose.model('Event', eventSchema);
const Drivers = mongoose.model('Driver', driverSchema);
const Passengers = mongoose.model('Passenger', passengerSchema);

module.exports = { Events, Drivers, Passengers };
