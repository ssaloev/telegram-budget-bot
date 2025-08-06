import {getActionData, locale,} from "../../../bot/botUtils";
import {createIfDontExist} from "./index";
import {ACTION_TYPES} from "../../../bot/types";
import type {Context} from "grammy/out/context";

export async function handeActionFromChannel(ctx: Context) {
    if (!ctx.channelPost) {
        return;
    }

    const text = ctx.channelPost.text;
    const id = ctx.channelPost.chat.id;

    if (!text) {
        return;
    }

    const actionData = getActionData(text);
    const getBudget = await createIfDontExist({
        channelId: id,
        mainBudget: 0,
    });

    if (!getBudget?.mainBudget && actionData.actionType === ACTION_TYPES.SUBTRACT_BUDGET) {
        return ctx.reply(locale.trySubtractFromEmpty);
    }

    switch (actionData.actionType) {
        case ACTION_TYPES.SUBTRACT_BUDGET: {
            getBudget.subtractMainBudget(actionData.value);
            break;
        }
        case ACTION_TYPES.ADD_BUDGET: {
            getBudget.addMainBudget(actionData.value);
            break;
        }
        default: {
            break;
        }
    }

    await getBudget.save();

    await ctx.reply(locale.yourBudget + getBudget.mainBudget);
}