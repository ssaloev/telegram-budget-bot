import { Budget } from "../../models/budget.model";

export async function findBudgetByChannelId(channelId: number) {
    return Budget.findOne({
        channelId
    });
}