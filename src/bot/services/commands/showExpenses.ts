import {locale} from "../../botUtils";
import type {Context} from "grammy/out/context";
import {getHistoryForLastMonth} from "../../../db/services/history";
import {IHistoryFields} from "../../../db/models/history.model";


export async function showExpenses(ctx: Context) {
    if (!ctx.channelPost) {
        return;
    }

    const id = ctx.channelPost.chat.id;

    const history = await getHistoryForLastMonth(id);

    await ctx.reply(locale.history);

    if (history.length < 1) {
        return ctx.reply(locale.emptyHistory);
    }

    const historyText = expensesByModifyType(history);

    if (!historyText) {
        return ctx.reply(locale.emptyHistory);
    }
    await ctx.reply(historyText);
}

function expensesByModifyType(history: Array<IHistoryFields>) {
    const expensesByModifyType: Record<string, number> = {};
    for (let i = 0; i < history.length; i += 1) {
        const historyValue = history[i];
        const isFirstDayOfMonth = i === 0;
        if (isFirstDayOfMonth || !historyValue.modifiedType) {
            continue;
        }

        const currentBudget = historyValue.currentBudget;
        const previousBudget = history[i - 1].currentBudget;
        const diff = currentBudget - previousBudget;
        if (diff > 0) {
            continue;
        }
        expensesByModifyType[historyValue.modifiedType] = expensesByModifyType[historyValue.modifiedType] ? expensesByModifyType[historyValue.modifiedType] + diff : diff;
    }

    const expensesByModifyTypeList: Array<Array<string | number>> = [];
    Object.keys(expensesByModifyType).forEach(key => {
        expensesByModifyTypeList.push([key, expensesByModifyType[key]]);
    });

    expensesByModifyTypeList.sort((a, b) => {
        const first = a[1] as number;
        const last = b[1] as number;
        return first - last;
    });


    return expensesByModifyTypeList.reduce((acc, item) => {
       acc += `${item[0]}: ${item[1]}\n`
        return acc;
    }, '');
}