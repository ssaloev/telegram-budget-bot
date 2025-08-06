import {getCommand, locale,} from "../../../bot/botUtils";
import {COMMAND_TYPES} from "../../../bot/types";
import type {Context} from "grammy/out/context";
import {getBudgetMoney} from "./getBudgetMoney";

export async function handeCommandsFromChannel(ctx: Context) {
    if (!ctx.channelPost) {
        return;
    }

    const text = ctx.channelPost.text;
    const id = ctx.channelPost.chat.id;

    if (!text) {
        return;
    }

    const commandType = getCommand(text);

    switch (commandType) {
        case COMMAND_TYPES.SHOW_BUDGET: {
            const budget = await getBudgetMoney(id);
            await ctx.reply(locale.yourBudget + budget);
            break;
        }
        case COMMAND_TYPES.SHOW_HISTORY: {
            break;
        }
        default: {
            break;
        }
    }
}