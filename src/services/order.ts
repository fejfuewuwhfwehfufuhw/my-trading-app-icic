import axios from "axios";
import {checksum} from "../crypto/checksum";

export const order =
  async (data: any, appkey: string, sessionToken: string) => {
    data = JSON.stringify({
      "stock_code": "ITC",
      "exchange_code": "NSE",
      "product": "cash",
      "action": "buy",
      "order_type": "market",
      "quantity": "1",
      "price": "263.15",
      "validity": "ioc",
    });
    const checksumValue = checksum(data);
    const url = "https://api.icicidirect.com/breezeapi/api/v1/order";
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const config = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
        "X-Checksum": "token "+checksumValue.checksum,
        "X-Timestamp": checksumValue.timestamp,
        "X-AppKey": appkey,
        "X-SessionToken": sessionToken,
      },
      data: data,
    };
    return axios(config);
  };
