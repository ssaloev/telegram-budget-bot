import type { Message } from "grammy/out/types";
import type { Context } from "grammy/out/context";
import {locale} from "./botUtils";
import {botChannelHandleError} from "./botChannelHandleError";
import {logInfo} from "../utils/log";
import {createIfDontExist} from "../db/services/budget";

export async function handleChatMember(ctx: Context): Promise<Message.TextMessage | void> {
    if (!ctx.myChatMember) {
        return;
    }

    try {
        const { new_chat_member, old_chat_member } = ctx.myChatMember;
        const chat = ctx.chat;
        if (!chat) {
            return;
        }
        if (chat.type !== "channel") {
            return;
        }

        logInfo(`✅ Bot was added to channel: ${old_chat_member.status }`);
        logInfo(`✅ Bot was added to channel: ${new_chat_member.status }`);

        const isAddLikeAmin = old_chat_member.status === "left" && new_chat_member.status === "administrator";
        const isKicked = new_chat_member.status === "left";
        if (!isAddLikeAmin || isKicked) {
            // @todo удалить БД если бота кикнули
            return;
        }

        logInfo(`✅ Bot was added to channel: ${chat.title}`);

        const model = await createIfDontExist({
            channelId: chat.id,
            mainBudget: 0,
        });

        // @todo if send immediate will get 403 error :(
        // @todo fixme
        setTimeout(async () => {
            await ctx.api.sendMessage(chat.id, locale.addedToChannel);
            await ctx.api.sendMessage(chat.id, locale.yourBudget + model.mainBudget);
        }, 1000);

    } catch (e) {
        await botChannelHandleError(ctx, e);
    }
}