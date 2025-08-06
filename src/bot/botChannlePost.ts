import type { Message } from "grammy/out/types";
import type { Context } from "grammy/out/context";
import {isActionAct, locale, replyWhenMessageInWrongFormat} from "./botUtils";
import {handeActionFromChannel} from "../db/services/budget";
import {botChannelHandleError} from "./botChannelHandleError";
import {logInfo} from "../utils/log";

export async function handleChannelMessage(ctx: Context): Promise<Message.TextMessage | void> {
    if (!ctx.channelPost) {
        return;
    }

    try {

        const text = ctx.channelPost.text;
        const id = ctx.channelPost.chat.id;

        logInfo('Channel post received: ', text, id);
        const isValid = text && isActionAct(text);
        if (!text || !isValid) {
            return ctx.reply(replyWhenMessageInWrongFormat());
        }

        await ctx.reply(locale.handle);

        const budget = await handeActionFromChannel({
            text,
            id,
        })

        await ctx.reply(locale.handled);
        await ctx.reply(locale.yourBudget + budget);
    } catch (e) {
        await botChannelHandleError(ctx, e);
    }
}