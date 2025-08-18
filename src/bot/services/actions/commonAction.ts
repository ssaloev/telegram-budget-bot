import type {Context} from "grammy/out/context";
import {getActionData} from "../../botUtils";
import {createIfDontExist} from "../../../db/services/budget";
import {CommonAction} from "./types";

export async function commonAction(ctx: Context): Promise<void | CommonAction> {
    if (!ctx.channelPost) {
        return;
    }

    const text = ctx.channelPost.text;
    const id = ctx.channelPost.chat.id;

    if (!text) {
        return;
    }

    const model = await createIfDontExist({
        channelId: id,
        mainBudget: 0,
    })

   return {
        model,
        actionData: getActionData(text),
   }
}