import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        amount={500} //cents
        token={(token) => this.props.handleToken(token)} //Callback function after credit authorization
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        currency="USD"
        name="AviGraphX"
        description="Premium Subscription"
      >
        <button className="btn">Purchase Premium</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
