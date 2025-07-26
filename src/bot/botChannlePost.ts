import type { Message } from "grammy/out/types";
import type { Context } from "grammy/out/context";
import { Budget } from '../db/models/budget.model'
import {logError, logInfo} from "../utils/log";
import {getActionData, isActionAct, locale, replyWhenMessageInWrongFormat} from "./botUtils";
import {createBudget, findBudgetByChannelId} from "../db/services/budget.service";
import {ACTION_TYPES} from "./types";

export async function handleChannelMessage(ctx: Context): Promise<Message.TextMessage> {
    if (!ctx.channelPost) {
        return;
    }

    try {

        const text = ctx.channelPost.text;
        const id = ctx.channelPost.chat.id;

        console.log('Channel post received: ', text, id);
        const isValid = text && isActionAct(text);
        if (!text || !isValid) {
            return ctx.reply(replyWhenMessageInWrongFormat());
        }

        await ctx.reply(locale.handle);
        const actionData = getActionData(text);


        let getBudget = await findBudgetByChannelId(id);
        if (!getBudget) {
            getBudget = await createBudget({
                channelId: id,
                mainBudget: 0,
            });
        }

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

        await ctx.reply(locale.handled);
        await ctx.reply(locale.yourBudget + getBudget.mainBudget);
    } catch (e) {
        await ctx.reply(locale.error);
        logError(e);
    }
}