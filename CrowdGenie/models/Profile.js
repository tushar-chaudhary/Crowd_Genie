const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  loan: [
    {
      loanId: {
        type: String,
        required: true
      },
      loanGranter: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: false
      },
      amount: {
        type: String,
        required: true
      },
      amount_month: {
        type: String,
        required: true
      },
      duration: {
        type: Date
      },
      active: {
        type: Boolean,
        default: false
      },
      rejected: {
        type: Boolean,
        default: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);