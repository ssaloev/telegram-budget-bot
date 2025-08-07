import {locale} from "../../botUtils";
import type {Context} from "grammy/out/context";
import {getHistoryForLastMonth} from "../../../db/services/history";
import {logInfo} from "../../../utils/log";


export async function showHistory(ctx: Context) {
    if (!ctx.channelPost) {
        return;
    }

    const id = ctx.channelPost.chat.id;

    const history = await getHistoryForLastMonth(id);

    await ctx.reply(locale.history);

    if (history.length < 1) {
        return ctx.reply(locale.emptyHistory);
    }

    const firstDayOfMonth = history[0];
    const space = '-'.repeat(10);

    await ctx.reply(space);
    await ctx.reply('В начале месяца было: ' + firstDayOfMonth.currentBudget);

    await ctx.reply('Конец подсчета истории');
    await ctx.reply(space);
}