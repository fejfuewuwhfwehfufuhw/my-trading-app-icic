/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions/v2";
import * as logger from "firebase-functions/logger";
import express, {Express, Request, Response} from "express";

const app: Express = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).send({status: "OK"});
});

app.post("/webhook", (req: Request, res: Response) => {
  // Handle the webhook payload here
  const data = req.body;
  logger.info("Webhook Payload:", data);

  // Respond to the webhook request
  res.status(200).send("Webhook received successfully!");
});

export const api = functions.https.onRequest(app);

