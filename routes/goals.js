const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Goals = require('../models/goals');
const { body, param, validationResult } = require('express-validator');

router.get('/', auth, (req, res) => {
  Goals.findOne({ userId: req.userId }, (err, result) => {
    if (err) { return res.sendStatus(500); }
    res.status(200).json({ netWorthGoal: result.netWorthGoal, otherGoals: result.otherGoals });
  });
});

router.put('/netWorthGoal', auth,
  [body('goal').isNumeric()],
  (req, res) => {
    if (!validationResult(req).isEmpty() || Number(req.body.goal) <= 0 || Number(req.body.goal) > 999999999999) { return res.sendStatus(500); }
    Goals.findOneAndUpdate({ userId: req.userId }, { netWorthGoal: req.body.goal }, {}, (err, result) => {
      if (err) { return res.sendStatus(500); }
      res.sendStatus(200);
    });
});

router.delete('/netWorthGoal', auth, (req, res) => {
  Goals.findOneAndUpdate({ userId: req.userId }, { netWorthGoal: 0 }, {}, (err, result) => {
    if (err) { return res.sendStatus(500); }
    res.sendStatus(200);
  });
});

// route to add a new goal, adds it to beginning of otherGoals array
router.post('/otherGoals', auth,
  [body('goal').not().isEmpty(),
  body('goal.goal').isNumeric(),
  body('goal.date').trim().escape(),
  body('goal.name').not().isEmpty().trim().escape()],
  async (req, res) => {
    if (!validationResult(req).isEmpty() || Number(req.body.goal) <= 0 || Number(req.body.goal) > 999999999999) { return res.sendStatus(500); }
    const newGoal = {
      name: req.body.goal.name,
      goal: Number(req.body.goal.goal),
      date: req.body.goal.date,
      contributions: [],
      isComplete: false
    };
    try {
      const goals = await Goals.findOne({ userId: req.userId });
      const otherGoals = [...goals.otherGoals];
      otherGoals.unshift(newGoal);
      goals.otherGoals = otherGoals;
      const result = await goals.save();
      res.status(200).json({ goals: result.otherGoals });
    } catch(e) { res.sendStatus(500); }
});

// route to edit a goal
router.put('/otherGoals', auth,
  [body('goal').not().isEmpty(),
  body('goal.val').isNumeric(),
  body('goal.date').not().isEmpty().trim().escape(),
  body('goal.name').not().isEmpty().trim().escape(),
  body('goal._id').not().isEmpty().trim().escape()],
  async (req, res) => {
    if (!validationResult(req).isEmpty() || Number(req.body.goal) <= 0 || Number(req.body.goal) > 999999999999) { return res.sendStatus(500); }
    try {
      const goals = await Goals.findOne({ userId: req.userId });
      const otherGoals = [...goals.otherGoals];
      const index = otherGoals.findIndex(goal => String(goal._id) === String(req.body.goal._id));
      otherGoals[index].name = req.body.goal.name;
      otherGoals[index].goal = req.body.goal.val;
      otherGoals[index].date = req.body.goal.date;
      goals.otherGoals = otherGoals;
      const result = await goals.save();
      res.status(200).json({ goals: result.otherGoals });
    } catch(e) { res.sendStatus(500); }
});

// route to update the isComplete property of a goal
router.put('/otherGoals/updateComplete', auth,
  [body('_id').not().isEmpty().trim().escape()],
  async (req, res) => {
    if (!validationResult(req).isEmpty()) { return res.sendStatus(500); }
    try {
      const goals = await Goals.findOne({ userId: req.userId });
      const otherGoals = [...goals.otherGoals];
      const index = otherGoals.findIndex(goal => String(goal._id) === String(req.body._id));
      otherGoals[index].isComplete = !otherGoals[index].isComplete;
      goals.otherGoals = otherGoals;
      const result = await goals.save();
      res.status(200).json({ goals: result.otherGoals });
    } catch(e) { res.sendStatus(500); }
});


// route to add a contribution to a goal, takes id of goal & the contribution value/date
router.put('/otherGoals/addContrib', auth,
  [body('contrib.date').not().isEmpty().trim().escape(),
  body('contrib.val').isNumeric(),
  body('_id').not().isEmpty().trim().escape()],
  async (req, res) => {
    if (!validationResult(req).isEmpty() || Number(req.body.contrib.val) <= 0 || Number(req.body.contrib.val) > 999999999999) { return res.sendStatus(500); }
    try {
      const goals = await Goals.findOne({ userId: req.userId });
      const otherGoals = [...goals.otherGoals];
      const index = otherGoals.findIndex(goal => String(goal._id) === String(req.body._id));
      // if contribution was made on same date then add it to that date else push to end
      const matchingIndex = otherGoals[index].contributions.findIndex(contrib => contrib.date === req.body.contrib.date);
      if (matchingIndex === -1) { otherGoals[index].contributions.push({ ...req.body.contrib }); }
      else { otherGoals[index].contributions[matchingIndex].val = Number(otherGoals[index].contributions[matchingIndex].val) + Number(req.body.contrib.val); }
      goals.otherGoals = otherGoals;
      const result = await goals.save();
      res.status(200).json({ goals: result.otherGoals });
    } catch(e) { res.sendStatus(500); }
});

// route to delete a goal
router.delete('/otherGoals/:_id', auth,
  [param('_id').not().isEmpty().trim().escape()],
  async (req, res) => {
    if (!validationResult(req).isEmpty()) { return res.sendStatus(500); }
    try {
      const goals = await Goals.findOne({ userId: req.userId });
      const otherGoals = goals.otherGoals.filter(goal => String(goal._id) !== String(req.params._id));
      goals.otherGoals = otherGoals;
      const result = await goals.save();
      res.status(200).json({ goals: result.otherGoals });
    } catch(e) { res.sendStatus(500); }
});

module.exports = router;
