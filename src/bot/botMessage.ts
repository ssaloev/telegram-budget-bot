import type { Message } from "grammy/out/types";
import type { Context } from "grammy/out/context";

export function handleMessages(ctx: Context): Promise<Message.TextMessage> {
    return ctx.reply("Welcome! Up and running.");
}