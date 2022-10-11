import React, { useEffect, useState } from "react";
import stripe from "../../../utils/stripe";

import StyledIndex from "./index.css";

class Index extends React.Component {

  state = {
    token: "",
    cardError: "",
  };

  componentDidMount() {
    const elements = stripe.elements();

    this.creditCard = elements.create("card", {
      style: {
        base: {
          fontSize: "16px",
        },
      },
    });

    this.creditCard.on("change", (event) => {
      if (event.error) {
        this.setState({ cardError: event.error.message });
      } else {
        this.setState({ cardError: "" });
      }
    });

    this.creditCard.mount(".credit-card");
  }

  handleSubmit = async () => {
    let stripeToken = null
    await stripe.createToken(this.creditCard).then(({ error, token }) => {
      if (error) {
        this.setState({ cardError: error.message });
      } else {
        this.setState({ token: token.id });
        stripeToken = token
      }
    });
    return stripeToken
  };

  render() {
    const { cardError, token } = this.state;

    return (
      <StyledIndex>
        <div className="credit-card" />
        {cardError && <p className="text-xs text-red-600 mt-2">{cardError}</p>}
      </StyledIndex>
    );
  }
}

Index.propTypes = {
  // prop: PropTypes.string.isRequired,
};

export default Index;