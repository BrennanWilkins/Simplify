const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Budgets = require('../models/budgets');
const { body } = require('express-validator');

router.get('/', auth, async (req, res) => {
  try {
    const result = await Budgets.findOne({ userId: req.userId });
    if (new Date().getMonth() !== new Date(result.date).getMonth()) {
      result.date = new Date();
      const newBudgets = [...result.budgets].map(budget => (
        { ...budget, remaining: budget.budget, transactions: [] }
      ));
      result.budgets = newBudgets;
      const result2 = await result.save();
      return res.status(200).json({ budgets: newBudgets });
    }
    res.status(200).json({ budgets: result.budgets });
  } catch(e) { res.sendStatus(500); }
});

router.post('/', auth,
  [body('budgets.*.category').trim().isLength({ min: 1, max: 1000 }).escape(),
  body('budgets.*.budget').trim().isLength({ min: 1, max: 1000 }).escape(),
  body('budgets.*.transactions.*').trim().isLength({ min: 1, max: 1000 }).escape()],
  async (req, res) => {
    try {
      if (await Budgets.findOne({ userId: req.userId })) { throw 'Already exists.' }
      const newBudget = new Budgets({ userId: req.userId, budgets: [...req.body.budgets], date: new Date() });
      const result = await newBudget.save();
      res.sendStatus(200);
    } catch(e) { res.sendStatus(500); }
});

router.put('/', auth,
  [body('budgets.*.category').trim().isLength({ min: 1, max: 1000 }).escape(),
  body('budgets.*.budget').trim().isLength({ min: 1, max: 1000 }).escape(),
  body('budgets.*.transactions.*').trim().isLength({ min: 1, max: 1000 }).escape()],
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
