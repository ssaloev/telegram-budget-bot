import type {Context} from "grammy/out/context";
import { getCommand, replyWhenMessageInWrongFormat} from "../../botUtils";
import {COMMAND_TYPES} from "../../types";
import {showHistory} from "./showHistory";
import {showBudget} from "./showBudget";

const dispatchAction = {
    [COMMAND_TYPES.SHOW_BUDGET]: showBudget,
    [COMMAND_TYPES.SHOW_HISTORY]: showHistory,
}

export async function handeCommand(ctx: Context) {
    if (!ctx.channelPost) {
        return;
    }

    const text = ctx.channelPost.text;
    const id = ctx.channelPost.chat.id;

    if (!text) {
        return;
    }

    const commandType = getCommand(text);
    const callback = dispatchAction[commandType];

    if (!callback) {
        return ctx.reply(replyWhenMessageInWrongFormat())
    }

    return callback(ctx);
}