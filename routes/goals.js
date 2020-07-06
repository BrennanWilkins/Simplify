const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Goals = require('../models/goals');

router.get('/', auth, (req, res, next) => {
  Goals.findOne({ userId: req.userId }, (err, result) => {
    if (err) { return res.status(500).json({ msg: 'Server Error.' }); }
    return res.status(200).json({ msg: 'Success', goal: result.netWorthGoal });
  });
});

router.post('/', auth, (req, res, next) => {
  const newGoal = new Goals({ userId: req.userId, netWorthGoal: req.body.goal });
  newGoal.save((err, result) => {
    if (err) { return res.status(500).json({ msg: 'Error creating goal.' }); }
    return res.status(200).json({ msg: 'Success' });
  });
});

router.put('/', auth, (req, res, next) => {
  Goals.findOneAndUpdate({ userId: req.userId }, { netWorthGoal: req.body.goal }, {}, (err, result) => {
    if (err) { return res.status(500).json({ msg: 'Error updating goal.' }); }
    return res.status(200).json({ msg: 'Success' });
  });
});

router.delete('/', auth, (req, res, next) => {
  Goals.findOneAndDelete({ userId: req.userId }, (err, result) => {
    if (err) { return res.status(500).json({ msg: 'Error deleting goal.' }); }
    return res.status(200).json({ msg: 'Success' });
  });
});

module.exports = router;
