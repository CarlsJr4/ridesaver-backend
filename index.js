const express = require('express');
const app = express();
const mongoose = require('mongoose');
const eventsRouter = require('./routes/events');

// Database
mongoose.connect('mongodb://localhost/carpool-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to mongodb!');
});

// Middleware
app.use('/api/events', eventsRouter);

// Etc
app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(3000);
