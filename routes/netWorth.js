const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const NetWorth = require('../models/netWorth');
const { body, validationResult } = require('express-validator');

router.put('/', auth,
  [body('netWorthData').not().isEmpty(),
  body('netWorthData.*._id').escape(),
  body('netWorthData.*.date').escape()],
  async (req, res) => {
    try {
      if (!validationResult(req).isEmpty()) { throw 'err'; }
      const result = await NetWorth.findOneAndUpdate({ userId: req.userId }, { dataPoints: req.body.netWorthData }, { new: true });
      res.status(200).json({ result });
    } catch(e) { res.sendStatus(500); }
});

module.exports = router;
