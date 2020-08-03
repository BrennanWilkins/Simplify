const { validationResult } = require('express-validator');

// validation middleware for express-validator validations
const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) { return next(); }

    res.sendStatus(500);
  };
};

module.exports = validate;
