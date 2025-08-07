import {getBudgetMoney} from "../../../db/services/budget";
import {locale} from "../../botUtils";
import type {Context} from "grammy/out/context";


export async function showHistory(ctx: Context) {
    if (!ctx.channelPost) {
        return;
    }

    const id = ctx.channelPost.chat.id;
    await ctx.reply(locale.history);
}