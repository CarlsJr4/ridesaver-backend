const express = require('express');
const cors = require('cors');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const eventsRouter = require('./routes/events');

require('dotenv').config();

const port = process.env.PORT;
const connectionString = process.env.db;

// Database
mongoose.connect(connectionString, {
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
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/events', eventsRouter);

var whitelist = ['http://localhost:3000', 'https://carlsjr4.github.io'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Etc
app.get('/', cors(corsOptions), function (req, res) {
  res.send('Hello World');
});

// Need to listen for environment variable port OR fallback to port 3000
app.listen(port || 3000, () => console.log(`Listening on port ${port}`));
