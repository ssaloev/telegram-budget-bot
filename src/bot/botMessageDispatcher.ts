import {Context} from "grammy/out/context";
import {Message} from "grammy/out/types";
import {isActionAct, isCommandAct, replyWhenMessageInWrongFormat} from "./botUtils";
import {handeActionFromChannel, handeCommandsFromChannel} from "../db/services/budget";

export async function botMessageDispatcher(ctx: Context): Promise<Message.TextMessage | void> {
    if (!ctx.channelPost) {
        return;
    }

    const dispatcher = [
        {
            canHandle: (ctx: Context) => isActionAct(ctx.channelPost?.text),
            handler: handeActionFromChannel,
        },
        {
            canHandle: (ctx: Context) => isCommandAct(ctx.channelPost?.text),
            handler: handeCommandsFromChannel,
        }
    ];
    const findHandler = dispatcher.find((item) => item.canHandle(ctx));
    if (!findHandler) {
        return ctx.reply(replyWhenMessageInWrongFormat());
    }

    return findHandler.handler(ctx);
}