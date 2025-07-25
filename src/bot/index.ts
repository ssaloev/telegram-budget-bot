import { Bot } from "grammy";
import { BOT_TOKEN } from "../config"
import { handleMessages } from "./botMessage"
import { handleStart } from "./botStart"
import { handleChannelMessage } from "./botChannlePost"


const bot = new Bot(BOT_TOKEN);

bot.command("start", handleMessages);
bot.on("message", handleStart);
bot.on('channel_post', handleChannelMessage);

export function startBot() {
    console.info('[BUDGET BOT] TRY START');
    bot.start();
}