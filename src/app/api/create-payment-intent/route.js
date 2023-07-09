import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const customer = await stripe.customers.create({
      // Get these details from body
      name: "Sanjay Kumar",
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    });
    const paymentIntent = await stripe.paymentIntents.create({
      // set the details from body
      currency: "EUR",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
      description: "Software development services",
      customer: customer.id,
    });

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
      {
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: {
          message: e.message,
        },
      }),
      {
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      }
    );
  }
}
