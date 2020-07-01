const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const NetWorth = require('../models/netWorth');

router.put('/', auth, (req, res, next) => {
  NetWorth.findOneAndUpdate({ userId: req.userId }, { dataPoints: req.body.netWorthData }, { new: true }, (err, result) => {
    if (err) { return res.status(500).json({ msg: 'Failed to update stats.' }); }
    return res.status(200).json({ msg: 'Success.', result });
  });
});

module.exports = router;
