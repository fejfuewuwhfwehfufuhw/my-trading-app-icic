import {botToken, chatId} from "../config";
import TelegramBot from "node-telegram-bot-api";

let bot: TelegramBot;

export const initBot = () => {
  bot = new TelegramBot(botToken.value(), {polling: false});
};

export const sendMessage = async (msg : string) => {
  await bot.sendMessage(chatId.value(), msg);
};
