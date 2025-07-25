import type { Message } from "grammy/out/types";
import type { Context } from "grammy/out/context";
import { Budget } from '../db/models/budget.model'

export async function handleChannelMessage(ctx: Context): Promise<Message.TextMessage> {
    if (!ctx.channelPost) {
        return;
    }
    const text = ctx.channelPost.text;
    const id = ctx.channelPost.chat.id;

    await Budget.create({
        channelId: id,
        mainBudget: 10,
        additionalBudget: 5,
    });

    console.log('Channel post received: ', text, id);
    await ctx.reply('Муродали');

}