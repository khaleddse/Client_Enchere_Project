import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { connect } from "react-redux";
import decode from "jwt-decode";
import { withRouter } from "react-router-dom";

const CheckoutForm = ({ item, price, history }) => {
  const stripe = useStripe();
  const elements = useElements();

  const { userId } = decode(localStorage.getItem("token"));
  const totalpts = item.reduce((curNumber, item) => {
    return Number(curNumber) + Number(item.totalpoint);
  }, 0);
  console.log(userId + "   " + totalpts, price);

  console.log(totalpts);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:5000/stripe/charge",
          {
            amount: price * 100,
            id: id,
            userId: userId,
            point: totalpts,
          }
        );

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          localStorage.removeItem("token");
          localStorage.setItem("token", response.data.token);
          console.log("CheckoutForm.js 25 | payment successful!");
          history.push("/Aucciel");
        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <CardElement />
      <button>Pay</button>
    </form>
  );
};
const mapStateToProps = (state) => {
  return {
    item: state.carte.items,
    price: state.carte.totalAmount,
  };
};

export default connect(mapStateToProps)(withRouter(CheckoutForm));
