import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Landing extends Component {
  render() {
    return (
      <div className="row" style={{ paddingTop: '3%' }}>
        <div
          className="col l12 m12 s12"
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, rgba(0, 47, 75, .5), rgba(220, 66, 37, .5)), url('images/login.jpg')",
            paddingBottom: '2%'
          }}
        >
          <h4
            className="white-text"
            style={{ fontWeight: '600', fontFamily: 'sans-serif' }}
          >
            Small Buisness
          </h4>
          <h4
            className="white-text"
            style={{ fontWeight: '600', fontFamily: 'sans-serif' }}
          >
            landing Platform.
          </h4>
          <h6
            className="white-text"
            style={{ fontWeight: '500', fontFamily: 'sans-serif' }}
          >
            License holder from Monetary Authority of Singapore
          </h6>
          <button
            className="btn waves-effect waves-light white black-text"
            name="action"
            style={{ marginTop: '3%', fontWeight: '800', fontSize: '110%' }}
          >
            <Link to="/register">JOIN NOW</Link>
          </button>
        </div>
        <div className="col l6 m6 s12">
          <div className="col s12 m12 l12">
            <div className="card" style={{ paddingTop: '8%' }}>
              <div className="card-image">
                <center>
                  <img src="images/borrowers.svg" style={{ width: '30%' }} />
                </center>
              </div>
              <div className="card-content">
                <center>
                  <span style={{ fontWeight: '800', fontSize: '200%' }}>
                    Borrowers
                  </span>
                  <p>
                    Initial upfront fees from $2000 for initial company
                    evaluation and listing
                  </p>
                  <button
                    className="btn waves-effect waves-light black white-text"
                    name="action"
                    style={{
                      marginTop: '3%',
                      fontWeight: '800',
                      fontSize: '110%'
                    }}
                  >
                    <Link to="/register">APPLY NOW</Link>
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
        <div className="col l6 m6 s12">
          <div className="col s12 m12 l12">
            <div className="card" style={{ paddingTop: '8%' }}>
              <div className="card-image">
                <center>
                  <img src="images/lenders.svg" style={{ width: '30%' }} />
                </center>
              </div>
              <div className="card-content">
                <center>
                  <span style={{ fontWeight: '800', fontSize: '200%' }}>
                    Lenders
                  </span>
                  <p>Less than 5% of monthly repayments</p>
                  <button
                    className="btn waves-effect waves-light black white-text"
                    name="action"
                    style={{
                      marginTop: '3%',
                      fontWeight: '800',
                      fontSize: '110%'
                    }}
                  >
                    <Link to="/register">APPLY NOW</Link>
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
