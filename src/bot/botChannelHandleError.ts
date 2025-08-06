import type {Context} from "grammy/out/context";
import {locale} from "./botUtils";
import {logError} from "../utils/log";
import {HandeActionError} from "../utils/errors/HandeActionError";
import {handleActionError} from "../db/services/budget/handleError";

export async function botChannelHandleError(ctx: Context, error: any) {
    try {
        logError(error);

        const handleErrorDispatchers = [
            {
                canHandle: (error: any) => error instanceof HandeActionError,
                handler: handleActionError
            }
        ]
        const findHandler = handleErrorDispatchers.find(({canHandle}) => canHandle(error));
        if (findHandler) {
            await findHandler.handler(ctx, error);
            return;
        }


        return ctx.reply(locale.error);
    } catch (e) {
        logError(e);
    }
}