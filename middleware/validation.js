const validator = require('../helpers/validate');

const saveMusicLog = (req, res, next) => {
  const validationRule = {
    instrument: 'required|string',
    duration: 'required|integer',
    focusArea: 'required|string',
    date: 'string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveMusician = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    email:'required|email',
    age:'required|integer',
    instrument: 'required|string',
    experienceLevel: 'string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveMusicLog,
  saveMusician
};