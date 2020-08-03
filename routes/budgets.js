const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Budgets = require('../models/budgets');
const { body } = require('express-validator');

router.post('/', auth,
  [body('budgets').not().isEmpty()],
  async (req, res) => {
    try {
      if (await Budgets.findOne({ userId: req.userId })) { throw 'Already exists.' }
      const newBudget = new Budgets({ userId: req.userId, budgets: [...req.body.budgets], date: new Date() });
      const result = await newBudget.save();
      res.sendStatus(200);
    } catch(e) { res.sendStatus(500); }
});

router.put('/', auth,
  [body('budgets').not().isEmpty(),
  body('budgets.budgets').not().isEmpty()],
  async (req, res) => {
    try {
      const result = await Budgets.findOneAndUpdate({ userId: req.userId }, { budgets: req.body.budgets }, {});
      res.sendStatus(200);
    } catch(e) { res.sendStatus(500); }
});

router.delete('/', auth, (req, res) => {
  Budgets.findOneAndDelete({ userId: req.userId }, (err, result) => {
    if (err) { return res.sendStatus(500); }
    return res.sendStatus(200);
  });
});

module.exports = router;
