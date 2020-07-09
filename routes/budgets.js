const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Budgets = require('../models/budgets');

router.get('/', auth, (req, res, next) => {
  Budgets.findOne({ userId: req.userId }, (err, result) => {
    if (err) { return res.status(500).json({ msg: 'Server Error.' }); }
    if (new Date().getMonth() !== new Date(result.date).getMonth()) {
      result.date = new Date();
      const newBudgets = [...result.budgets].map(budget => (
        { ...budget, remaining: budget.budget, transactions: [] }
      ));
      result.budgets = newBudgets;
      result.save((err, result2) => {
        if (err) { return res.status(500).json({ msg: 'Server Error.' }); }
        return res.status(200).json({ msg: 'Success', budgets: newBudgets });
      });
    }
    return res.status(200).json({ msg: 'Success', budgets: result.budgets });
  });
});

router.post('/', auth, (req, res, next) => {
  Budgets.findOne({ userId: req.userId }, (err, result) => {
    if (err) { return res.status(500).json({ msg: 'Server Error.' }); }
    if (result) { return res.status(500).json({ msg: 'Budget already found for user.' }); }
    const newBudget = new Budgets({ userId: req.userId, budgets: [...req.body.budgets], date: new Date() });
    newBudget.save((err, result) => {
      if (err) { return res.status(500).json({ msg: 'Server Error.' }); }
      return res.status(200).json({ msg: 'Success' });
    });
  });
});

router.put('/', auth, (req, res, next) => {
  Budgets.findOneAndUpdate({ userId: req.userId }, { budgets: req.body.budgets }, {}, (err, result) => {
    if (err) { return res.status(500).json({ msg: 'Server Error.' }); }
    return res.status(200).json({ msg: 'Success' });
  });
});

router.delete('/', auth, (req, res, next) => {
  Budgets.findOneAndDelete({ userId: req.userId }, (err, result) => {
    if (err) { return res.status(500).json({ msg: 'Server Error.' }); }
    return res.status(200).json({ msg: 'Success' });
  });
});

module.exports = router;
