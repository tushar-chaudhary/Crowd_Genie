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

// Load short-unique-id generator
var ShortUniqueId = require('short-unique-id');
var uid = new ShortUniqueId();

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

    Profile.findOne({ user: req.user.id })
      .populate('user', ['email', 'accountType'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/request_loan
// @desc    POST loan request
// @access  Private
router.post(
  '/request_loan',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateProfileInput(req.body);

    // // Check Validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    const loan = {
      loanId: uid.randomUUID(8),
      amount: req.body.amount,
      amount_month: req.body.amountMonth
    };

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          const UserProfile = new Profile({
            user: req.user.id,
            loan: loan
          });

          UserProfile.save()
            .then(user => res.json(UserProfile))
            .catch(err => console.log(err));
        } else {
          profile.loan = profile.loan.unshift(loan);
          const updateProfile = Profile(profile);
          updateProfile
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/all
// @desc    Get current active borrowers that are asking for loan
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find({ loan: { $elemMatch: { active: true, rejected: false } } })
    .populate('user', ['email', 'accountType'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
