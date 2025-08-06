import {Context} from "grammy/out/context";
import {Message} from "grammy/out/types";
import {isActionAct, replyWhenMessageInWrongFormat} from "./botUtils";
import {handeActionFromChannel} from "../db/services/budget";

export async function botMessageDispatcher(ctx: Context): Promise<Message.TextMessage | void> {
    if (!ctx.channelPost) {
        return;
    }

    const dispatcher = [
        {
            canHandle: (ctx: Context) => isActionAct(ctx.channelPost?.text),
            handler: handeActionFromChannel,
        }
    ];
    const findHandler = dispatcher.find((item) => item.canHandle);
    if (!findHandler) {
        return ctx.reply(replyWhenMessageInWrongFormat());
    }

    return findHandler.handler(ctx);
}