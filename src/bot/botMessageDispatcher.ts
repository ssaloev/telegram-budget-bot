import {Context} from "grammy/out/context";
import {Message} from "grammy/out/types";
import {isActionAct, isCommandAct, replyWhenMessageInWrongFormat} from "./botUtils";
import {handeAction} from "./services/actions";
import {handeCommand} from "./services/commands";

export async function botMessageDispatcher(ctx: Context): Promise<Message.TextMessage | void> {
    if (!ctx.channelPost) {
        return;
    }

    const dispatcher = [
        {
            canHandle: (ctx: Context) => isActionAct(ctx.channelPost?.text),
            handler: handeAction,
        },
        {
            canHandle: (ctx: Context) => isCommandAct(ctx.channelPost?.text),
            handler: handeCommand,
        }
    ];
    const findHandler = dispatcher.find((item) => item.canHandle(ctx));
    if (!findHandler) {
        return ctx.reply(replyWhenMessageInWrongFormat());
    }

    return findHandler.handler(ctx);
}