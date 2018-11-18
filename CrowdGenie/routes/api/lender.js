const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');

// Load Profile Model
const Profile = require('../../models/Profile');

// Load User Model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.find({ loanGranter: req.user.loanGranter })
      .populate('user', ['email', 'accountType'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        else{
            res.json(profile);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/request_loan
// @desc    POST loan request
// @access  Private
router.post(
  '/grant_loan',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOneAndUpdate({ user: req.body.userid })
      .then(profile => {
        if (!profile) {
            return res.status(400).json({error: "Profile not found"});
        } else {

          profile.forEach(loan=>{
              if(loan.loanId === req.body.loanId){
                  loan.loanGranter = req.user.id
                  loan.save()
                  .then(user => res.json(UserProfile))
                  .catch(err => console.log(err));
              }
              res.json(loan);
          })  
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
