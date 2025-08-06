import type {Context} from "grammy/out/context";
import {locale} from "./botUtils";
import {logError} from "../utils/log";

export async function botChannelHandleError(ctx: Context, error: any) {
    try {
        logError(error);
        return ctx.reply(locale.error);
    } catch (e) {
        logError(e);
    }
}