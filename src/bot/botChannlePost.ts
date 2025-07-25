import type { Message } from "grammy/out/types";
import type { Context } from "grammy/out/context";
import { Budget } from '../db/models/budget.model'
import {logInfo} from "../utils/log";
import {isActionAct, replyWhenMessageInWrongFormat} from "./botUtils";

export async function handleChannelMessage(ctx: Context): Promise<Message.TextMessage> {
    if (!ctx.channelPost) {
        return;
    }

    const text = ctx.channelPost.text;
    const id = ctx.channelPost.chat.id;

    console.log('Channel post received: ', text, id);
    const isValid = text && isActionAct(text);
    if (!text || !isValid) {
        await ctx.reply(replyWhenMessageInWrongFormat());
        return;
    }

    await ctx.reply('Обрабатываем/Коркард ⌛');
}