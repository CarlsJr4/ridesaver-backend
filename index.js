const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
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
mongoose.set('useFindAndModify', false);

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/events', eventsRouter);

// Etc
app.get('/', function (req, res) {
  res.send('Hello World');
});

// Need to listen for environment variable port OR fallback to port 3000
app.listen(process.env.PORT || 3000);
