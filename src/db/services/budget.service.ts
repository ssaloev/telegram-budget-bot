import {Budget, IBudget, IBudgetFields} from "../models/budget.model";

export async function isEmptyBudget(channelId: number) {
    const value = await findBudgetByChannelId(channelId);
    return value !== undefined;
}

export async function createBudget(data: IBudgetFields) {
    return Budget.create({
        channelId: data.channelId,
        mainBudget: data.mainBudget,
    });
}

export async function findBudgetByChannelId(channelId: number) {
    return Budget.findOne({
        channelId
    });
}