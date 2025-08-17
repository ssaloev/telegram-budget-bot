import {locale} from "../../botUtils";
import type {Context} from "grammy/out/context";
import {getHistoryForLastMonth} from "../../../db/services/history";
import {IHistoryFields} from "../../../db/models/history.model";
import {getDayMonthYear} from "../../../utils/dates/dateFormat";
import {getFormatedPriceNumber} from "../../../utils/numbers/formatNumbers";


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

    const historyText = makeHistory(history);
    await ctx.reply(historyText);
}

function makeHistory(history: Array<IHistoryFields>) {
    let historyText = '';
    for (let i = 0; i < history.length; i += 1) {
        const historyValue = history[i];
        const isFirstDayOfMonth = i === 0;
        const createdAt = historyValue.createdAt
        if (!createdAt) {
            continue;
        }
        const date = getDayMonthYear(createdAt);

        let budgetLeft = '';
        if (isFirstDayOfMonth) {
            budgetLeft =  `🗓️${date} Было: ${getFormatedPriceNumber(historyValue.currentBudget)} TJS \n`;
        } else {
            const currentBudget = historyValue.currentBudget;
            const previousBudget = history[i - 1].currentBudget;
            const diff = currentBudget - previousBudget;
            budgetLeft =  `🗓️${date} Стало: ${getFormatedPriceNumber(historyValue.currentBudget)} TJS (${getFormatedPriceNumber(diff)} ${historyValue.modifiedType})`;
        }
        historyText += `${budgetLeft}\n`;
    }

    historyText += `\n Текущий бюджет: ${getFormatedPriceNumber(history[history.length - 1].currentBudget)} TJS`;
    return historyText;
}