export  async function GET(request) {
  return new Response(
    JSON.stringify({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );
}
