import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <div className="nav-wrapper">
        <Link
          to="/"
          className="brand-logo center black-text text-darken-1 large"
          style={{ color: 'white', fontWeight: '400' }}
        >
          Crowd Genie
        </Link>

        <ul id="nav-mobile" className="right hide-on-med-and-down black-text">
          <li>
            <Link
              className="black"
              to="/register"
              style={{ color: 'white', fontWeight: '600' }}
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              className="grey"
              to="/login"
              style={{ color: 'white', fontWeight: '600' }}
            >
              Log In
            </Link>
          </li>
        </ul>
      </div>
    );

    const authLinks = (
      <div className="nav-wrapper">
        <Link
          to="/"
          className="brand-logo center black-text text-darken-1 large"
          style={{ color: 'white', fontWeight: '400' }}
        >
          Crowd Genie
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down black-text">
          <li>
            <a
              className="black dropdown-trigger"
              data-target="dropdown1"
              href=""
              style={{ color: 'white', fontWeight: '600' }}
            >
              <i className="fa fa-bell" aria-hidden="true" />
              <span className="new red badge" style={{ fontWeight: '600' }}>
                4
              </span>
            </a>
          </li>
          <li>
            <a
              className="grey"
              onClick={this.onLogoutClick.bind(this)}
              style={{ color: 'white', fontWeight: '600' }}
            >
              Log Out
            </a>
          </li>
        </ul>
      </div>
    );

    return (
      <div className="navbar-fixed">
        <nav className="white black-text">
          {isAuthenticated ? authLinks : guestLinks}
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);