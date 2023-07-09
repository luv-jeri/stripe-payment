"use client";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import Stripe from "stripe";

// const stripe = new Stripe(
//   "sk_test_51NOWyHSDQH8ONy11WZQP3PY5FJI0eFzt4UpfIASrKN1tjBS9iaNGqgX7ncIIxQWJSmxJ4kM0X9LckZvvjztkCV4X00WGhM8w7l"
// )

// const createPaymentIntent = async (cb) => {
//   const paymentIntent = await stripe.paymentIntents.create({
//     currency: "EUR",
//     amount: 1999,
//     automatic_payment_methods: { enabled: true },
//   });
//   cb(paymentIntent.client_secret);
// }

export default function Page() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/config").then(async (result) => {
      const { publishableKey } = await result.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({
        // send the amount to the client for the next step
      }),
    })
      .then(async (result) => {
        var { clientSecret } = await result.json();
        setClientSecret(clientSecret);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Next.js v13.4 + Stripe Checkout
      </h1>
      {clientSecret && stripePromise ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      ) : (
        <h2>Error...</h2>
      )}
    </div>
  );
}
