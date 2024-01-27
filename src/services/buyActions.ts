import {BreezeConnect} from "breezeconnect";

export const buyAction = async (action: string,
  expiry: string,
  right: string,
  strikePrice: string,
  breeze: BreezeConnect) => {
  return await breeze.placeOrder(
    {
      stockCode: "NIFTY",
      exchangeCode: "NFO",
      product: "options",
      action: action,
      orderType: "market",
      quantity: "50",
      price: "",
      validity: "day",
      disclosedQuantity: "0",
      expiryDate: new Date(expiry).toISOString(),
      right: right,
      strikePrice: strikePrice,
    },
  );
};
