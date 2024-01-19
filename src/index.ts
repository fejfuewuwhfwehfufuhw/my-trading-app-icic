import * as functions from "firebase-functions";
import * as logger from "firebase-functions/logger";
import express, {Express, Request, Response} from "express";
// import * as crypto from "crypto";
import {getCustomerDetails} from "./services/customerDetails";

// const secret = functions.config().icicidirect.crypto ?? "SECRET_KEY";
const API_KEY = functions.config().icicidirect.key ?? "API_KEY";

// const timeStamp = new Date().getTime().toString();
// const data = JSON.stringify({}); // 'body' is the body of the current request
// const rawChecksum = timeStamp+"\r\n"+data;

// const checksum = crypto.createHmac("sha256", secret).update(rawChecksum);

// to base64
// checksum.digest("base64");

const app: Express = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).send({status: "OK"});
});

app.post("/redirect-url", async (req: Request, res: Response) => {
  // Handle the webhook payload here
  const data = req.body;
  const apiSession = data.API_Session;

  logger.info("API Session Established: ", apiSession);
  const customerDetails = await getCustomerDetails({
    SessionToken: apiSession,
    AppKey: API_KEY,
  });
  // Respond to the webhook request
  res.status(200)
    .send(`Webhook received successfully! 
    ${JSON.stringify(customerDetails.data)}`);
});

export const api = functions.https.onRequest(app);

