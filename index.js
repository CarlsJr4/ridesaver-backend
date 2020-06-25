const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Events = require('./models/events');

mongoose.connect('mongodb://localhost/carpool-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to mongodb!');
});

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.post('/', async (req, res) => {
  const event1 = new Events({
    name: 'Ice Skating With Friends',
    author: 'Carl D.',
    drivers: [
      {
        name: 'John Doe',
        nickname: 'Johnny',
        seats: 3,
        passengers: [
          {
            name: 'Jane Doe',
            nickname: 'Plain Jane',
          },
        ],
      },
    ],
  });
  const test = await event1.save();
  res.send(test);
});

app.listen(3000);
