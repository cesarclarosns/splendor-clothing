const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

// Payments with Stripe
const stripe = require("stripe")(
  "sk_test_51KV5ZnJw2d9D8cf62ARMKnKu0IWYDdp7f3tT50qeYoBqYTa1PA0vXx0LVb9hDkCZaaLmFVpEPiGdvvidVkvo4oqB00t4EqIhlD"
);

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/create-payment-intent", async (req, res) => {
  console.log("req.body: ", req.body);
  const { amount } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));
