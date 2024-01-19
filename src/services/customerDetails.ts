import axios from "axios";

export const getCustomerDetails =
  async (data: {SessionToken: string, AppKey: string})=> {
    await axios.post("https://api.icicidirect.com/breezeapi/api/v1/customerdetails", data);
  };
