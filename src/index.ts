import {onRequest} from "firebase-functions/v2/https";
import {initializeApp} from "firebase-admin/app";
import {setGlobalOptions} from "firebase-functions/v2";
import express, {Express, Request, Response} from "express";
import {defineSecret} from "firebase-functions/params";
import {BreezeConnect} from "breezeconnect";
import {buyAction} from "./services/buyActions";
import {squareOffAction} from "./services/squareOffAction";

initializeApp();
setGlobalOptions({region: "asia-south1"});

const app: Express = express();
app.use(express.json());
const apiKey = defineSecret("ICICI_API_KEY");
const secretKey = defineSecret("ICICI_SECRET_KEY");

let breeze: BreezeConnect;

app.get("/health", (req, res) => {
  res.status(200).send({status: "OK"});
});

app.post("/webhook", async (req: Request, res: Response) => {
  const {action, strikePrice, right, expiry} = req.body;
  let result;
  switch (action) {
  case "buy":
    result = await buyAction(action, expiry, right, strikePrice, breeze);
    break;
  case "sell":
    result = await squareOffAction(action, expiry, right, strikePrice, breeze);
    break;
  default:
    result = {message: "I don't know what to do!!"};
  }

  res.status(200).send(JSON.stringify(result));
});

app.get("/funds", async (req: Request, res: Response) => {
  res.status(200).send(JSON.stringify(await breeze.getFunds()));
});

app.post("/redirect-url", async (req: Request, res: Response) => {
  const data = req.body;
  const sessionToken = data.API_Session;
  breeze = new BreezeConnect({"appKey": apiKey.value()});
  const customerDetails = await breeze
    .generateSession(secretKey.value(), sessionToken)
    .then(async () => {
      return await breeze.getCustomerDetails(sessionToken);
    });
  const userName = customerDetails.Success?.idirect_user_name;

  res.status(200)
    .send(`Webhook received successfully!
    ${userName}`);
});

exports.api = onRequest({
  secrets: ["ICICI_API_KEY", "ICICI_SECRET_KEY"],
}, app);
