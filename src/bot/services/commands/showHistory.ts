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

    logInfo(history);

    await ctx.reply(locale.history);
}