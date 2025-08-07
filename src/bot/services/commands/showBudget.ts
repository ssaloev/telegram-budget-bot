import {getBudgetMoney} from "../../../db/services/budget";
import {locale} from "../../botUtils";
import type {Context} from "grammy/out/context";


export async function showBudget(ctx: Context) {
    if (!ctx.channelPost) {
        return;
    }

    const id = ctx.channelPost.chat.id;
    const budget = await getBudgetMoney(id);
    await ctx.reply(locale.yourBudget + budget);
}