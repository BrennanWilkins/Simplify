const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Goals = require('../models/goals');
const { body } = require('express-validator');
const validate = require('../middleware/validation');

router.get('/', auth, (req, res) => {
  Goals.findOne({ userId: req.userId }, (err, result) => {
    if (err) { return res.sendStatus(500); }
    res.status(200).json({ goal: result.netWorthGoal });
  });
});

router.post('/', auth,
  validate([body('goal').not().isEmpty().trim().escape()]),
  (req, res) => {
    const newGoal = new Goals({ userId: req.userId, netWorthGoal: req.body.goal });
    newGoal.save((err, result) => {
      if (err) { return res.sendStatus(500); }
      res.sendStatus(200);
    });
  }
);

router.put('/', auth,
  validate([body('goal').not().isEmpty().trim().escape()]),
  (req, res) => {
    Goals.findOneAndUpdate({ userId: req.userId }, { netWorthGoal: req.body.goal }, {}, (err, result) => {
      if (err) { return res.sendStatus(500); }
      res.sendStatus(200);
    });
});

router.delete('/', auth, (req, res) => {
  Goals.findOneAndDelete({ userId: req.userId }, (err, result) => {
    if (err) { return res.sendStatus(500); }
    res.sendStatus(200);
  });
});

module.exports = router;
