import { buffer } from "micro";
import * as admin from "firebase-admin";

// Secure a connection to firebase from backend
// const serviceAccount = require("../../../permissions.json");
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
// console.log(serviceAccount);
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// Establish connection to stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  console.log("Fulfilling order", session);

  try {
    await app
      .firestore()
      .collection("users")
      .doc(session.metadata.email)
      .collection("orders")
      .doc(session.id)
      .set({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    console.log(`SUCCESS: Order ${session.id} has been added to DB.`);
  } catch (err) {
    console.error("Error in fulfilling order:", err.message);
    throw err; // Rethrow the error to be caught in the webhook handler
  }
};

export default async (req, res) => {
  if (req.method == "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    // Verify that the event posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
      //   console.log("Event constructed: " + event);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === "checkout.session.completed") {
      console.log("-------------------Request BODY-------------------");
      console.log(req.body);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      console.log("Handling checkout.session.completed event");
      const session = event.data.object;

      try {
        await fulfillOrder(session);
        res.status(200).send("Success");
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
      }
    } else {
      console.log(`Unhandled event type: ${event.type}`);
      res.status(200).send("Event type not handled");
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export const config = {
  api: { bodyParser: false, externalResolver: true },
};
