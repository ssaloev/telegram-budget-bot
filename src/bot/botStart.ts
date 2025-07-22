import type { Message } from "grammy/out/types";
import type { Context } from "grammy/out/context";

export function handleStart(ctx: Context): Promise<Message.TextMessage> {
    return ctx.reply("Got another message!");
}