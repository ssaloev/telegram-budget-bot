import type {Context} from "grammy/out/context";
import {locale} from "../../botUtils";
import {commonAction} from "./commonAction";

export async function subtractMainBudget(ctx: Context) {
    const data = await commonAction(ctx);

    if (!data) {
        return;
    }

    if (!data.model?.mainBudget) {
        return ctx.reply(locale.trySubtractFromEmpty);
    }

    data.model.subtractMainBudget(data.actionData.value);
    await data.model.save();

    await ctx.reply(locale.yourBudget + data.model.mainBudget);
}