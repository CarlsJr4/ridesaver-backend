const express = require('express');
const router = express.Router();
const Events = require('../models/events');

router.post('/new', async (req, res) => {
  const event1 = new Events({
    name: 'Ice Skating With Friends',
    author: 'Carl D.',
    drivers: [],
  });
  const test = await event1.save();
  res.send(test);
});

module.exports = router;
