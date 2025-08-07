import type {Context} from "grammy/out/context";
import {locale} from "../../botUtils";
import {commonAction} from "./commonAction";
import {createHistory} from "../../../db/services/history";

export async function subtractMainBudget(ctx: Context) {
    const data = await commonAction(ctx);

    if (!data) {
        return;
    }

    if (!data.model?.mainBudget) {
        return ctx.reply(locale.trySubtractFromEmpty);
    }

    data.model.subtractMainBudget(data.actionData.value, data.actionData.modifiedType);
    await data.model.save();

    await createHistory({
        modifiedType: data.actionData.modifiedType,
        channelId: data.model.channelId,
        currentBudget: data.model.mainBudget,
    });

    await ctx.reply(locale.yourBudget + data.model.mainBudget);
}