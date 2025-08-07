import { Bot } from "grammy";
import { BOT_TOKEN } from "../config"
import { handleMessages } from "./botMessage"
import { handleStart } from "./botStart"
import { handleChannelMessage } from "./botChannlePost"
import {handleChatMember} from "./botChatMember";


const bot = new Bot(BOT_TOKEN);

bot.command("start", handleMessages);
bot.on("message", handleStart);
bot.on('channel_post', handleChannelMessage);
bot.on('my_chat_member', handleChatMember);

export function startBot() {
    console.info('[BUDGET BOT] TRY START');
    bot.start();
}