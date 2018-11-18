import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      accountType: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      accountType: this.state.accountType
    };

    this.props.registerUser(newUser, this.props.history);

    // axios
    //   .post('/api/auth/register', newUser)
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <section className="section section-login">
          <div className="row">
            <div
              className="col l12 m12 s12"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, rgba(191, 67, 249, .5), rgba(51, 2, 74, .5)), url('images/login.jpg')",
                paddingBottom: '2%'
              }}
            >
              <center style={{ marginTop: '5%', marginBottom: '5%' }}>
                <h4 className="white-text" style={{ fontWeight: 600 }}>
                  New to Crowd Genie? Sign Up!
                </h4>
                <h5 className="white-text" style={{ fontWeight: 600 }}>
                  Create an account to get started
                </h5>
              </center>
            </div>
          </div>
          <div className="row" style={{ marginTop: '5%' }}>
            <div className="col m1 l2" />
            <div
              className="col s12 m10 l8 card-panel"
              style={{ paddingLeft: '0' }}
            >
              <div
                className="col s12 m6"
                style={{
                  paddingTop: '5%',
                  paddingLeft: '5%',
                  paddingRight: '10%'
                }}
              >
                <h6
                  style={{
                    fontWeight: '600',
                    fontFamily: 'sans-serif',
                    paddingBottom: '3%'
                  }}
                >
                  Sign up for Crowd Genie
                </h6>
                <div className="divider" />
                <h6
                  style={{
                    fontWeight: '600',
                    fontFamily: 'sans-serif',
                    paddingBottom: '1%',
                    paddingTop: '3%'
                  }}
                >
                  Forgot your password?
                </h6>
                <Link to="/" className="purple-text text-darken-2">
                  Reset it here
                </Link>
                <h6
                  style={{
                    fontWeight: '600',
                    fontFamily: 'sans-serif',
                    paddingBottom: '1%',
                    paddingTop: '3%'
                  }}
                >
                  Already registered?
                </h6>
                <Link to="/login" className="purple-text text-darken-2">
                  Login here
                </Link>
              </div>
              <div className="col s12 m6 grey lighten-5">
                <form onSubmit={this.onSubmit}>
                  <h5 className="black-text darken-2 left-align">Sign Up</h5>
                  <div className="input-field" style={{ width: '100%' }}>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      className={classnames('validate', {
                        invalid: errors.email
                      })}
                    />
                    <label htmlFor="email">Email</label>
                    <span
                      className="helper-text"
                      data-error={errors.email}
                      data-success="right"
                    />
                  </div>
                  <div className="input-field">
                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      className={classnames('validate', {
                        invalid: errors.password
                      })}
                    />
                    <label htmlFor="password">Password</label>
                    <span
                      className="helper-text"
                      data-error={errors.password}
                      data-success="right"
                    />
                  </div>
                  <div className="input-field">
                    <select
                      id="accountType"
                      className={classnames(
                        'browser-default grey lighten-5 validate',
                        { invalid: errors.accountType }
                      )}
                      name="accountType"
                      value={this.state.accountType}
                      onChange={this.onChange}
                    >
                      <option value="" disabled defaultValue>
                        Account Type
                      </option>
                      <option value="Borrower">Borrower</option>
                      <option value="Lender">Lender</option>
                    </select>
                    <span
                      className="helper-text"
                      data-error={errors.accountType}
                      data-success="right"
                    />
                  </div>
                  <div className="row">
                    <button
                      className="btn waves-effect waves-light black darken-1 left-align"
                      style={{
                        fontWeight: '600',
                        marginLeft: '3%'
                      }}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col m1 l2" />
          </div>
        </section>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
