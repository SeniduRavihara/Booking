

import * as functions from "firebase-functions";
import algoliasearch from "algoliasearch";
import md5 = require("md5");
import crypto = require("crypto");

// Enable CORS
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors")({ origin: true });


const env = functions.config();
const client = algoliasearch(env.algolia.app_id, env.algolia.admin_api_key);
const index = client.initIndex("stores");

export const onStoreCreated = functions.firestore
  .document("store/{storeId}")
  .onCreate((snap, ctx) => {
    return index.saveObject({
      objectID: ctx.params.storeId,
      ...snap.data(),
    });
  });

export const onStoreDelete = functions.firestore
  .document(`store/{storeId}`)
  .onDelete((snap, ctx) => {
    return index.deleteObject(ctx.params.storeId);
  });

exports.onStoreUpdate = functions.firestore
  .document("store/{storeId}")
  .onUpdate(async (change, context) => {
    const newData = change.after.data(); // Get the updated data
    const objectID = context.params.storeId; // Get the ID of the updated document

    return await index.partialUpdateObject({
      objectID,
      ...newData,
    });
  });

exports.payherePaymentNotification = functions.https.onRequest(
  async (req, res) => {
    const {
      merchant_id,
      order_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig,
    } = req.body;

    // Fetch merchant secret from secure location (e.g., Firebase environment variables)
    const merchantSecret = getMerchantSecret();

    // Verify payment notification
    const localMd5sig = md5(
      `${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${merchantSecret}`
    )
      .toString()
      .toUpperCase();

    if (localMd5sig !== md5sig) {
      res.status(400).send("Invalid payment notification");
      return;
    }

    // Payment notification is valid, update database based on status_code
    if (status_code === "2") {
      // Payment successful, update database
    } else {
      // Payment failed or canceled, handle accordingly
    }

    res.status(200).send("Payment notification processed successfully");
  }
);

function getMerchantSecret() {
  return "MTg4NjU1MTUxMjExNzQzNzk4OTkyMjIyMDUzNjk3MTIwMTcyNDM5MA==";
}


exports.generatePayHereHash = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(400).json({ error: "Invalid request method" });
    }

    const { merchant_id, order_id, amount, currency } = req.body;

    if (!merchant_id || !order_id || !amount || !currency) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const merchant_secret =
      "MTg4NjU1MTUxMjExNzQzNzk4OTkyMjIyMDUzNjk3MTIwMTcyNDM5MA==";

    // Format the amount to two decimal places and remove commas
    const formattedAmount = parseFloat(amount).toFixed(2).replace(/,/g, "");

    // Hash the merchant_secret
    const hashedSecret = crypto
      .createHash("md5")
      .update(merchant_secret, "utf-8")
      .digest("hex")
      .toUpperCase();

    // Construct the string to hash
    const concatString =
      merchant_id + order_id + formattedAmount + currency + hashedSecret;

    // Generate hash using MD5 algorithm
    const hash = crypto
      .createHash("md5")
      .update(concatString, "utf-8")
      .digest("hex")
      .toUpperCase();
    console.log("Hash generated:", hash);

    // Set CORS headers
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST");

    return res.status(200).json({ hash });
  });
});