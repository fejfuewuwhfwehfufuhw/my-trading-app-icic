import axios from "axios";

export const getCustomerDetails =
  async (data: { SessionToken: string, AppKey: string }) => {
    const url = "https://api.icicidirect.com/breezeapi/api/v1/customerdetails";
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const config = {
      method: "get",
      url: url,
      headers: {"Content-Type": "application/json"},
      data: JSON.stringify(data),
    };
    return axios(config);
  };
