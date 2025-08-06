import {getActionData, } from "../../../bot/botUtils";
import {createIfDontExist} from "./index";
import {ACTION_TYPES} from "../../../bot/types";
import {HandeActionError} from "../../../utils/errors/HandeActionError";
import {ERROR_TEXT} from "./errorText";
import type {HandleActionChannel} from './types'

export async function handeActionFromChannel({ text, id }: HandleActionChannel) {
    const actionData = getActionData(text);
    const getBudget = await createIfDontExist({
        channelId: id,
        mainBudget: 0,
    });

    if (!getBudget?.mainBudget && actionData.actionType === ACTION_TYPES.SUBTRACT_BUDGET) {
        throw new HandeActionError(ERROR_TEXT.TRY_SUBTRACT_FROM_EMPTY);
    }

    switch (actionData.actionType) {
        case ACTION_TYPES.SUBTRACT_BUDGET: {
            getBudget.subtractMainBudget(actionData.value);
            break;
        }
        case ACTION_TYPES.ADD_BUDGET: {
            getBudget.addMainBudget(actionData.value);
            break;
        }
        default: {
            break;
        }
    }

    await getBudget.save();

    return getBudget.mainBudget;
}