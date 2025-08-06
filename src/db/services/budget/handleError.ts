import type {Context} from "grammy/out/context";
import {HandeActionError} from "../../../utils/errors/HandeActionError";
import {ERROR_TEXT} from "./errorText";
import {locale} from "../../../bot/botUtils";
import {logInfo} from "../../../utils/log";

export function handleActionError(ctx: Context, error: HandeActionError) {
    let text = '';
    switch (error.message) {
        case ERROR_TEXT.TRY_SUBTRACT_FROM_EMPTY: {
            text = locale.trySubtractFromEmpty
            break;
        }
        default: {
            break;
        }
    }

    return ctx.reply(text);
}