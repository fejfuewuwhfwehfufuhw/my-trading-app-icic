import crypto from "crypto";
// import {defineSecret} from "firebase-functions/lib/params";

// const secretKey = defineSecret("ICICI_DIRECT_SECRET_KEY");
const secretKey = "ICICI_DIRECT_SECRET_KEY";

export const checksum = (body: any) => {
  const timeStamp = new Date().getTime().toString();
  const data = JSON.stringify(body);
  const rawChecksum = timeStamp + "\r\n" + data;

  const checksum = crypto
    .createHmac("sha256", secretKey).update(rawChecksum);

  // to base64
  return {timestamp: timeStamp, checksum: checksum.digest("base64")};
};
