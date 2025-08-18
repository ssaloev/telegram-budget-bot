import type {Context} from "grammy/out/context";
import {getActionData, replyWhenMessageInWrongFormat} from "../../botUtils";
import {ACTION_TYPES} from "../../types";
import {addMainBudget} from "./addMainBudget";
import {subtractMainBudget} from "./subtractMainBudget";

const dispatchAction = {
    [ACTION_TYPES.SUBTRACT_BUDGET]: subtractMainBudget,
    [ACTION_TYPES.ADD_BUDGET]: addMainBudget,
}

export async function handeAction(ctx: Context) {
    if (!ctx.channelPost) {
        return;
    }

    const text = ctx.channelPost.text;

    if (!text) {
        return;
    }

    const actionType = getActionData(text).actionType;
    const callback = dispatchAction[actionType];

    if (!callback) {
        return ctx.reply(replyWhenMessageInWrongFormat())
    }

    return callback(ctx);
}