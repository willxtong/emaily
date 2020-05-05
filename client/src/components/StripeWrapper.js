import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { handleToken } from '../actions';

const Payments = (props) => {
  return (
    <StripeCheckout
      amount={500}
      description="Purchase Email Credits"
      name="Emaily"
      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
      token={(t) => props.handleToken(t)}>
      <button className="btn">Add Credits</button>
    </StripeCheckout>
  );
};

export default connect(null, { handleToken })(Payments);
