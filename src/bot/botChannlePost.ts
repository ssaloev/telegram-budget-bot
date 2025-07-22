import type { Message } from "grammy/out/types";
import type { Context } from "grammy/out/context";

export async function handleChannelMessage(ctx: Context): Promise<Message.TextMessage> {
    if (ctx.channelPost) {
        const text = ctx.channelPost.text;
        console.log('Channel post received:', text);
        await ctx.reply('Муродали');
    } else {
        console.error('[BUDGET BOT] ctx.channelPost is empty');
    }

}