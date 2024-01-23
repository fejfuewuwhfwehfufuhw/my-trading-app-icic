import {onRequest} from "firebase-functions/v2/https";
import {initializeApp} from "firebase-admin/app";
import {setGlobalOptions} from "firebase-functions/v2";
import express, {Express, Request, Response} from "express";
import {order} from "./services/order";
import {getCustomerDetails} from "./services/customerDetails";
import {defineSecret} from "firebase-functions/params";
import {BreezeConnect} from "breezeconnect";

initializeApp();
setGlobalOptions({region: "asia-south1"});

const app: Express = express();
app.use(express.json());
let sessionToken = "";
const apiKey = defineSecret("ICICI_API_KEY");
const secretKey = defineSecret("ICICI_SECRET_KEY");

const breeze = new BreezeConnect({"appKey": apiKey.value()});

app.get("/health", (req, res) => {
  res.status(200).send({status: "OK"});
});

app.post("/webhook", async (req: Request, res: Response) => {
  await order(req, apiKey.value(), sessionToken);
  breeze.generateSession(secretKey.value(), sessionToken);
  res.status(200).send();
});

app.post("/redirect-url", async (req: Request, res: Response) => {
  // Handle the webhook payload here
  const data = req.body;
  const apiSession = data.API_Session;

  // logger.info("API Session Established: ", apiSession);
  const customerDetails = await getCustomerDetails({
    SessionToken: apiSession,
    AppKey: apiKey.value(),
  });
  sessionToken = customerDetails.data.Success?.session_token;
  // Respond to the webhook request
  res.status(200)
    .send(`Webhook received successfully!
    ${JSON.stringify(customerDetails.data.Success?.idirect_user_name)}`);
});
// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.api = onRequest(app);
