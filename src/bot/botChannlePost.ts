import type { Message } from "grammy/out/types";
import type { Context } from "grammy/out/context";
import {locale} from "./botUtils";
import {botChannelHandleError} from "./botChannelHandleError";
import {logInfo} from "../utils/log";
import {botMessageDispatcher} from "./botMessageDispatcher";

export async function handleChannelMessage(ctx: Context): Promise<Message.TextMessage | void> {
    if (!ctx.channelPost) {
        return;
    }

    try {

        const text = ctx.channelPost.text;
        const id = ctx.channelPost.chat.id;

        logInfo('Channel post received: ', text, id);

        await ctx.reply(locale.handle);

        await botMessageDispatcher(ctx);

        await ctx.reply(locale.handled);
    } catch (e) {
        await botChannelHandleError(ctx, e);
    }
}