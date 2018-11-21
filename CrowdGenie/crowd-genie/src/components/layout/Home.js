import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forwardRequest, submitloanRequest } from '../../actions/profileAction';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      amount: '',
      profile: '',
      amountMonth: '',
      email: '',
      loanId: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitNew = this.onSubmitNew.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.setState({ profile: this.props.profile.profile });
  }

  componentWillReceiveProps(nextProps) {
    this.props.history.push('/dashboard');
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      amount: this.state.amount,
      amountMonth: this.state.amountMonth
    };

    this.props.forwardRequest(newUser);
    this.props.history.push('/dashboard');
  }

  onSubmitNew(e) {
    e.preventDefault();
    const grantUser = {
      granterId: this.state.profile.id,
      loanId: this.state.loanId
    };

    this.props.submitloanRequest(grantUser);
  }

  render() {
    const { profile } = this.props.profile;
    const borrowerHome = (
      <div>
        <div className="row">
          <div className="col l8 m8 s12" style={{ paddingTop: '3%' }}>
            <div style={{ marginLeft: '10%' }}>
              <h2 className="orange-text" style={{ fontWeight: '700' }}>
                Debt happens.
              </h2>
              <h2 className="blue-grey-text" style={{ fontWeight: '700' }}>
                It's how you get out that
              </h2>
              <h2 className="blue-grey-text" style={{ fontWeight: '700' }}>
                counts
              </h2>

              <p style={{ fontWeight: '600' }}>
                We offer loans at a fixed rate, no fee-personal loan which can
                be used to pay off high interest credit card debt, or for major
                purchases on special occassions.
              </p>
            </div>
          </div>
          <div
            className="col l4 m4 s12 blue-grey darken-3"
            style={{ paddingBottom: '20%' }}
          >
            <center>
              <form onSubmit={this.onSubmit}>
                <p
                  className="white-text"
                  style={{ fontWeight: '500', marginTop: '30%' }}
                >
                  I'd like to ask loan options upto
                </p>
                <div className="input-field">
                  <input
                    placeholder="Enter Amount"
                    name="amount"
                    value={this.state.amount}
                    onChange={this.onChange}
                    type="text"
                    className="validate"
                  />
                </div>
                <p
                  className="white-text"
                  style={{ fontWeight: '500', marginTop: '10%' }}
                >
                  with monthly payments about
                </p>
                <div className="input-field">
                  <input
                    placeholder="Enter Amount/month"
                    name="amountMonth"
                    value={this.state.amountMonth}
                    onChange={this.onChange}
                    type="text"
                    className="validate"
                  />
                </div>
                <button
                  className="btn waves-effect waves-light light-blue darken-2 white-text"
                  name="action"
                  style={{
                    marginTop: '3%',
                    fontWeight: '500',
                    fontSize: '80%'
                  }}
                >
                  find my loan options
                </button>
              </form>
            </center>
          </div>
        </div>
      </div>
    );

    const loanerHome = (
      <div>
        <div className="row">
          <div className="col l8 m8 s12" style={{ paddingTop: '3%' }}>
            <div style={{ marginLeft: '10%' }}>
              <h2 className="orange-text" style={{ fontWeight: '700' }}>
                Want to give loans.
              </h2>
              <h2 className="blue-grey-text" style={{ fontWeight: '700' }}>
                Now you can earn profits
              </h2>
              <h2 className="blue-grey-text" style={{ fontWeight: '700' }}>
                in terms of investment.
              </h2>

              <p style={{ fontWeight: '600' }}>
                We offer loans at a fixed rate, no fee-personal loan which can
                be used to pay off high interest credit card debt, or for major
                purchases on special occassions.
              </p>
            </div>
          </div>
          <div
            className="col l4 m4 s12 blue-grey darken-3"
            style={{ paddingBottom: '30%' }}
          >
            <center>
              <p
                className="white-text"
                style={{ fontWeight: '500', marginTop: '30%' }}
              >
                I'd like to give loan to
              </p>
              <form onSubmit={this.onSubmitNew}>
                <div className="input-field">
                  <input
                    placeholder="Enter User Email"
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    className="validate"
                  />
                </div>
                <div className="input-field">
                  <input
                    placeholder="Enter Loan ID"
                    type="text"
                    name="loanId"
                    value={this.state.loanId}
                    onChange={this.onChange}
                    className="validate"
                  />
                </div>
                <button
                  className="btn waves-effect waves-light light-blue darken-2 white-text"
                  name="action"
                  style={{
                    marginTop: '3%',
                    fontWeight: '500',
                    fontSize: '80%'
                  }}
                >
                  Approve loan
                </button>
              </form>
            </center>
          </div>
        </div>
      </div>
    );

    var homeTemplate = '';

    if (profile.accountType === 'Borrower') {
      homeTemplate = borrowerHome;
    } else {
      homeTemplate = loanerHome;
    }

    return <div>{homeTemplate}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile,
  loanData: state.profile.loanData,
  grantedLoan: state.grantedLoan
});

export default connect(mapStateToProps, { forwardRequest, submitloanRequest })(
  Home
);
