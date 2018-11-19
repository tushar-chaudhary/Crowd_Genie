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
        type: String,
        default: 'null'
      },
      amount: {
        type: String,
        required: true
      },
      amount_month: {
        type: String,
        required: true
      },
      active: {
        type: Boolean,
        default: true
      },
      rejected: {
        type: Boolean,
        default: false
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
