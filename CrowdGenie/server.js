const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const user = require('./routes/api/user');
const borrower = require('./routes/api/borrower');
const lender = require('./routes/api/lender');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true } )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

app.get('/', (req, res) => res.send('Hello World'));

// Use Routes
app.use('/api/auth', user);
app.use('/api/borrower', borrower);
app.use('/api/lender', lender);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));