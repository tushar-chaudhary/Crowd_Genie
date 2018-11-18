import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser, setCurrentfacebookUser } from '../../actions/authActions';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
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
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

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
      password: this.state.password
    };

    this.props.loginUser(newUser);
  }

  render() {
    const { errors } = this.state;

    const responseFacebook = response => {
      const newData = {
        email: response.email,
        name: response.name
      };

      axios.post('/api/auth/facebookUser', newData).then(res => {
        const { token } = res.data;
        // Set token to ls
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        console.log(decoded);
        setCurrentfacebookUser(decoded);
        window.location.reload();
      });
    };

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
                <h4 className="white-text" style={{ fontWeight: '600' }}>
                  Login to Crowd Genie
                </h4>
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
                    fontWeight: 600,
                    fontFamily: 'sans-serif',
                    paddinBottom: '3%'
                  }}
                >
                  Need help logging in?
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
                  Don't have an account?
                </h6>
                <Link to="/register" className="purple-text text-darken-2">
                  Sign up for free
                </Link>
              </div>
              <div className="col s12 m6 grey lighten-5">
                <center>
                  <h5 className="black-text darken-2 left-align">Log In</h5>
                  <form onSubmit={this.onSubmit}>
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
                    <div className="row">
                      <button
                        className="btn waves-effect waves-light black darken-1 right-align"
                        style={{
                          fontWeight: '600',
                          marginLeft: '1%',
                          width: '210px',
                          height: '100%'
                        }}
                      >
                        Log In
                      </button>
                    </div>
                  </form>
                  <div
                    style={{
                      width: '100%',
                      height: '20px',
                      borderBottom: '1px solid grey',
                      textAlign: 'center'
                    }}
                  >
                    <span
                      className="grey lighten-5"
                      style={{ fontSize: '20px', padding: '0 10px' }}
                    >
                      or
                    </span>
                  </div>
                  <div className="row" style={{ paddingTop: '5%' }}>
                    <center>
                      <FacebookLogin
                        appId="573322219804480"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={responseFacebook}
                      />
                    </center>,
                    {/* <center>
                    <button className="loginBtn loginBtn--facebook">
                      Login with Facebook
                    </button>
                  </center> */}
                  </div>
                </center>
              </div>
            </div>
            <div className="col m1 l2" />
          </div>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
