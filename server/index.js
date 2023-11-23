import express from "express";
import cors from "cors";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51OF8qBFC4Fm3kHXvtJTsrI4l7ERxvDGDnbNxX1qGntrgbOzNnyriyF69X7jIbqC7Lbhy3yumyhuAFfP0En9hfhxo00pvfl33Gf",
  { apiVersion: null }
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((itemStripe) => {
    lineItems.push({
      price: itemStripe.item.id,
      quantity: itemStripe.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.post("/", (req, res) => {
  res.send("Hello world");
});
app.listen(3000, () => {
  console.log("Server is Working");
});
