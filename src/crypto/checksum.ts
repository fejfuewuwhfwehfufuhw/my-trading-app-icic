import crypto from "crypto";
import {defineSecret} from "firebase-functions/params";

const secretKey = defineSecret("ICICI_SECRET_KEY");

export const checksum = (body: any) => {
  const timeStamp = new Date().getTime().toString();
  const data = JSON.stringify(body);
  const rawChecksum = timeStamp + "\r\n" + data;

  const checksum = crypto
    .createHmac("sha256", secretKey.value()).update(rawChecksum);

  // to base64
  return {timestamp: timeStamp, checksum: checksum.digest("base64")};
};
