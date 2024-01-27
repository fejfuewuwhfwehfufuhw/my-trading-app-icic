import {BreezeConnect} from "breezeconnect";

export const squareOffAction = async (action: string,
  expiry: string,
  right: string,
  strikePrice: string,
  breeze: BreezeConnect) => {
  return breeze.squareOff(
    {
      exchangeCode: "NFO",
      product: "options",
      stockCode: "NIFTY",
      expiryDate: new Date(expiry).toISOString(),
      right: right,
      strikePrice: strikePrice,
      action: action,
      orderType: "market",
      validity: "day",
      stoploss: "0",
      quantity: "50",
      price: "0",
      tradePassword: "",
      disclosedQuantity: "0",
    },
  );
};
