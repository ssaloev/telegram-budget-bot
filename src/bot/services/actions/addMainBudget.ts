import type {Context} from "grammy/out/context";
import {locale} from "../../botUtils";
import {commonAction} from "./commonAction";

export async function addMainBudget(ctx: Context) {
    const data = await commonAction(ctx);

    if (!data) {
        return;
    }

    data.model.addMainBudget(data.actionData.value);

    await data.model.save();

    await ctx.reply(locale.yourBudget + data.model.mainBudget);
}