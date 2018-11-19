import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getUser,
  updateUser,
  getallloanRequest
} from '../../actions/profileAction';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      accountType: '',
      allLoan: '',
      loan: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    this.props.getUser();
    this.props.getallloanRequest();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile.loanDetails) {
      this.setState({ loan: nextProps.profile.profile.loanDetails.loan });
    } else {
      this.setState({ loan: '' });
    }

    if (nextProps.profile.allActiveloan) {
      this.setState({ allLoan: nextProps.profile.allActiveloan });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const updateUser = {
      email: this.props.profile.profile.email,
      name: this.props.profile.profile.name,
      id: this.props.profile.profile.id,
      accountType: this.state.accountType
    };

    this.props.updateUser(updateUser);
    window.location.reload();

    // axios
    //   .post('/api/auth/register', newUser)
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { profile } = this.props.profile;
    const { loan, allLoan } = this.state;

    const userAccoutNotFound = (
      <div
        className="card"
        style={{
          paddingLeft: '0',
          borderRadius: '1%',
          paddingTop: '1%',
          paddingBottom: '2%',
          marginLeft: '10%',
          marginRight: '10%',
          marginTop: '10%'
        }}
      >
        <div className="card-content">
          <h3 style={{ fontWeight: '600' }}>Just one more step....</h3>
          <h5 style={{ fontWeight: '500', fontFamily: 'sans-serif' }}>
            Tushar
          </h5>
          <p style={{ fontFamily: 'sans-serif', fontWeight: '500' }}>
            Choose below to select your account type
          </p>

          <form onSubmit={this.onSubmit}>
            <select
              className="browser-default"
              name="accountType"
              value={this.state.accountType}
              onChange={this.onChange}
            >
              <option value="" disabled selected>
                Choose your account type
              </option>
              <option value="Borrower">Borrower</option>
              <option value="Lender">Lender</option>
            </select>

            <button
              className="btn waves-effect waves-light black darken-2 white-text"
              name="action"
              style={{
                marginTop: '3%',
                fontWeight: '500',
                fontSize: '80%',
                marginLeft: '90%'
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );

    let loanDashboard = [];

    if (loan !== '') {
      for (var index = 0; index < loan.length; index++) {
        loanDashboard.push(
          <div className="row" style={{ marginTop: '5%' }}>
            <div className="col l3 m2" />
            <div
              className="col s12 m8 l6 card"
              style={{
                paddingLeft: '0',
                borderRadius: '1%',
                paddingTop: '1%',
                paddingBottom: '2%'
              }}
            >
              <div className="card-content">
                <div
                  className="col l6 m6 s6"
                  style={{
                    fontWeight: '600',
                    fontSize: '110%',
                    paddingLeft: '3%'
                  }}
                >
                  Loan: <span className="red-text">{loan[index].loanId}</span>
                </div>
                <div
                  className="col l6 m6 s6 green-text right-align"
                  style={{ fontWeight: '600', fontSize: '110%' }}
                >
                  {loan[index].active ? 'Active' : 'Not Active'}
                </div>
                <center style={{ marginTop: '7%' }}>
                  <div
                    className="progress grey lighten-5"
                    style={{
                      width: '95%',
                      height: '15px',
                      borderRadius: '5px'
                    }}
                  >
                    <div
                      className="determinate orange"
                      style={{
                        width: `${loan[index].rejected ? '0%' : '100%'}`
                      }}
                    />
                  </div>
                </center>
                <div
                  className="col l6 m6 s6 green-text left-align"
                  style={{
                    fontWeight: '600',
                    fontFamily: 'sans-serif',
                    paddingLeft: '3%'
                  }}
                >
                  <span className="red-text">Granted</span>
                </div>
                <div
                  className="col l6 m6 s6 green-text right-align"
                  style={{
                    fontWeight: '600',
                    fontFamily: 'sans-serif'
                  }}
                >
                  <span className="red-text">Amount</span>
                </div>
                <div
                  className="col l6 m6 s6 green-text left-align"
                  style={{
                    fontWeight: '600',
                    fontFamily: 'sans-serif',
                    paddingLeft: '3%'
                  }}
                >
                  <span className="black-text">
                    {loan[index].loanGranter !== 'null' ? 'YES' : 'NO'}
                  </span>
                </div>
                <div
                  className="col l6 m6 s6 green-text right-align"
                  style={{ fontWeight: '600', fontFamily: 'sans-serif' }}
                >
                  <span className="black-text">${loan[index].amount}</span>
                </div>
              </div>
            </div>
            <div className="col l3 m2" />
          </div>
        );
      }
    } else {
      loanDashboard = (
        <div className="row" style={{ marginTop: '5%' }}>
          <div className="col l3 m2" />
          <div
            className="col s12 m8 l6 card"
            style={{
              paddingLeft: '0',
              borderRadius: '1%',
              paddingTop: '1%',
              paddingBottom: '2%'
            }}
          >
            <div className="card-content">
              <center>
                <h3 style={{ fontWeight: '600', fontFamily: 'sans-serif' }}>
                  You have not applied for the loan
                </h3>
              </center>
            </div>
          </div>
          <div className="col l3 m2" />
        </div>
      );
    }

    let loanerDashboard = [];

    if (allLoan !== '') {
      for (var index = 0; index < allLoan.length; index++) {
        allLoan[index].loan.forEach((activeLoans, key) => {
          loanerDashboard.push(
            <div className="row" style={{ marginTop: '5%' }}>
              <div className="col l3 m2" />
              <div
                className="col s12 m8 l6 card"
                style={{
                  paddingLeft: '0',
                  borderRadius: '1%',
                  paddingTop: '1%',
                  paddingBottom: '2%'
                }}
              >
                <div className="card-content">
                  <div
                    className="col l6 m6 s6"
                    style={{
                      fontWeight: '600',
                      fontSize: '110%',
                      paddingLeft: '3%'
                    }}
                  >
                    Loan: <span className="red-text">{activeLoans.loanId}</span>
                  </div>
                  <div
                    className="col l6 m6 s6 green-text right-align"
                    style={{ fontWeight: '600', fontSize: '110%' }}
                  >
                    {activeLoans.active ? 'Active' : 'Not Active'}
                  </div>
                  <center style={{ marginTop: '7%' }}>
                    <div
                      className="progress grey lighten-5"
                      style={{
                        width: '95%',
                        height: '15px',
                        borderRadius: '5px'
                      }}
                    >
                      <div
                        className="determinate orange"
                        style={{
                          width: `${activeLoans.rejected ? '0%' : '100%'}`
                        }}
                      />
                    </div>
                  </center>
                  <div
                    className="col l6 m6 s6 green-text left-align"
                    style={{
                      fontWeight: '600',
                      fontFamily: 'sans-serif',
                      paddingLeft: '3%'
                    }}
                  >
                    <span className="red-text">Email</span>
                  </div>
                  <div
                    className="col l6 m6 s6 green-text right-align"
                    style={{
                      fontWeight: '600',
                      fontFamily: 'sans-serif'
                    }}
                  >
                    <span className="red-text">Amount</span>
                  </div>
                  <div
                    className="col l6 m6 s6 green-text left-align"
                    style={{
                      fontWeight: '600',
                      fontFamily: 'sans-serif',
                      paddingLeft: '3%'
                    }}
                  >
                    <span className="black-text">
                      {allLoan[index].user.email}
                    </span>
                  </div>
                  <div
                    className="col l6 m6 s6 green-text right-align"
                    style={{ fontWeight: '600', fontFamily: 'sans-serif' }}
                  >
                    <span className="black-text">${activeLoans.amount}</span>
                  </div>
                </div>
              </div>
              <div className="col l3 m2" />
            </div>
          );
        });
      }
    } else {
      loanerDashboard = (
        <div className="row" style={{ marginTop: '5%' }}>
          <div className="col l3 m2" />
          <div
            className="col s12 m8 l6 card"
            style={{
              paddingLeft: '0',
              borderRadius: '1%',
              paddingTop: '1%',
              paddingBottom: '2%'
            }}
          >
            <div className="card-content">
              <center>
                <h3 style={{ fontWeight: '600', fontFamily: 'sans-serif' }}>
                  No one has applied for loan
                </h3>
              </center>
            </div>
          </div>
          <div className="col l3 m2" />
        </div>
      );
    }

    const borrowerAccount = (
      <div>
        <div className="row">
          <div
            className="col l12 m12 s12"
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, rgba(255, 105, 91, .5), rgba(165, 18, 4, .5)), url('images/login.jpg')",
              paddingBottom: '2%'
            }}
          >
            <center style={{ marginTop: '5%', marginBottom: '5%' }}>
              <h4 className="white-text" style={{ fontWeight: '600' }}>
                Know your loan status
              </h4>
            </center>
          </div>
        </div>
        {loanDashboard}
      </div>
    );

    const loanerStatus = (
      <div>
        <div className="row">
          <div
            className="col l12 m12 s12"
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, rgba(255, 105, 91, .5), rgba(165, 18, 4, .5)), url('images/login.jpg')",
              paddingBottom: '2%'
            }}
          >
            <center style={{ marginTop: '5%', marginBottom: '5%' }}>
              <h4 className="white-text" style={{ fontWeight: '600' }}>
                People are asking for your help
              </h4>
            </center>
          </div>
        </div>
        {loanerDashboard}
      </div>
    );

    var templateUse = '';

    if (profile.accountType === 'null') {
      templateUse = userAccoutNotFound;
    } else if (profile.accountType === 'Borrower') {
      templateUse = borrowerAccount;
    } else {
      templateUse = loanerStatus;
    }

    return <div>{templateUse}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, {
  getUser,
  updateUser,
  getallloanRequest
})(Dashboard);
