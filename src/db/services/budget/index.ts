import { findBudgetByChannelId } from './findBudgetByChannelId';
import { createBudget } from './createBudget';
import { IBudgetFields } from "../../models/budget.model";

async function createIfDontExist(data: IBudgetFields) {
    const budget = await findBudgetByChannelId(data.channelId);
    if (budget) {
        return budget;
    }

    return createBudget(data)
}

export {
    findBudgetByChannelId,
    createBudget,
    createIfDontExist
};