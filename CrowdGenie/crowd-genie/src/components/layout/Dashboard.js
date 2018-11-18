import React, { Component } from 'react';

class Dashboard extends Component {
  constructor() {
    super();
  }

  render() {
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

          <select className="browser-default">
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
        </div>
      </div>
    );

    return <div />;
  }
}

export default Dashboard;
