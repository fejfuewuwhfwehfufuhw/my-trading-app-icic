import {defineSecret} from "firebase-functions/params";

export const apiKey = defineSecret("ICICI_API_KEY");
export const secretKey = defineSecret("ICICI_SECRET_KEY");
export const chatId = defineSecret("TELEGRAM_PERSONAL_CHAT_ID");
export const botToken = defineSecret("TELEGRAM_BOT_TOKEN");
