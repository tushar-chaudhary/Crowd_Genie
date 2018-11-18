const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.amount = !isEmpty(data.amount) ? data.amount : '';
  data.amount_month = !isEmpty(data.amount_month) ? data.amount_month : '';
  data.duration = !isEmpty(data.duration) ? data.duration : '';

  
  if (Validator.isEmpty(data.amount)) {
    errors.amount = 'Amount field is required';
  }

  if (Validator.isEmpty(data.amount_month)) {
    errors.amount_month = 'Amount/Month field is required';
  }

  if (Validator.isEmpty(data.duration)) {
    errors.duration = 'Duration field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
